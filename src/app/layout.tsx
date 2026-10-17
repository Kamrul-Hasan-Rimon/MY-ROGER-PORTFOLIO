import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/" } : undefined,
  title: {
    default: `${profile.name} — Full-Stack & AI Engineer`,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.name} builds full-stack applications, AI-powered automations, and agentic systems with a focus on practical product engineering.`,
  applicationName: `${profile.name} Portfolio`,
  openGraph: {
    type: "website",
    title: `${profile.name} — Engineering Intelligent Software`,
    description: "Full-stack development, AI automation, and agentic AI systems.",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full-Stack & AI Engineer`,
    description: profile.intro,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#070910" }, { media: "(prefers-color-scheme: light)", color: "#f6f8fc" }],
};

const themeInit = `try{var t=localStorage.getItem('kh-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.dataset.theme='light'}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>{children}</body>
    </html>
  );
}
