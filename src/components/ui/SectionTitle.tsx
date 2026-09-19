type Props = { eyebrow?: string; title: string; text?: string; center?: boolean };
export function SectionTitle({ eyebrow, title, text, center }: Props) { return <div className={`section-title ${center ? "center" : ""}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{text && <p>{text}</p>}</div>; }
