import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(254),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional(),
}).strict();

// Best-effort process-local throttling. Use a shared store at the edge for multi-instance production deployments.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown-client";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}

export async function POST(request: NextRequest) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > 20_000) {
    return NextResponse.json({ message: "The submitted form is too large." }, { status: 413 });
  }

  const key = clientKey(request);
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    return NextResponse.json({ message: "Too many attempts. Please wait a few minutes before trying again." }, { status: 429 });
  }
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 2000) {
    for (const [storedKey, timestamps] of attempts) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) attempts.delete(storedKey);
      if (attempts.size <= 1500) break;
    }
  }

  let raw: unknown;
  try {
    // Bound the streamed body as well as trusting neither Content-Length nor the client.
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ message: "Please send a valid JSON form submission." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > 20_000) {
        await reader.cancel();
        return NextResponse.json({ message: "The submitted form is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    raw = JSON.parse(new TextDecoder().decode(bytes)) as unknown;
  } catch { return NextResponse.json({ message: "Please send a valid JSON form submission." }, { status: 400 }); }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please review the form fields and try again.", errors: parsed.error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })) }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ message: "The submission could not be processed." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ message: "Contact delivery is not configured yet. Please add the email settings or try another verified contact method." }, { status: 503 });
  }

  const { name, email, subject, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `<h2>Portfolio contact message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr/><p>${escapeHtml(message).replace(/\r?\n/g, "<br/>")}</p>`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      // Do not return provider internals or credentials to the visitor.
      return NextResponse.json({ message: "The email service could not accept your message. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ message: "Message delivered. Thank you for reaching out." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "The email service could not be reached. Your message was not confirmed as sent." }, { status: 502 });
  }
}
