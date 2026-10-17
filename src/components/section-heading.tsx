type Props = { index: string; eyebrow: string; title: string; titleId?: string; description?: string; sideNote?: string };

export function SectionHeading({ index, eyebrow, title, titleId, description, sideNote }: Props) {
  return (
    <div className="section-heading">
      <div className="section-heading-main">
        <div className="eyebrow"><span className="section-index">{index}</span>{eyebrow}</div>
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {sideNote ? <span className="section-side-note">{sideNote}</span> : null}
    </div>
  );
}
