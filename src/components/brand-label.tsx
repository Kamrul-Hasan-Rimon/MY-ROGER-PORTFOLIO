import { profile } from "@/lib/content";

export function BrandLabel() {
  const [firstName, ...remainingName] = profile.name.trim().toUpperCase().split(/\s+/);
  return (
    <>
      <span className="brand-mark" aria-hidden="true"><span>{profile.initials.slice(0, 1)}</span><span>{profile.initials.slice(1, 2)}</span></span>
      <span className="brand-name">{firstName}<span>{remainingName.join(" ")}</span></span>
    </>
  );
}
