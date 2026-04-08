import Image from "next/image";
import Link from "next/link";

type Action = {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
};

type HeroProps = {
  kicker: string;
  title: string;
  lead: string;
  imageSrc: string;
  imageAlt: string;
  imagePriority?: boolean;
  actions?: Action[];
  note?: {
    label: string;
    text: string;
  };
};

type SectionIntroProps = {
  kicker: string;
  title: string;
  copy?: string;
};

type ClosingBandProps = {
  kicker: string;
  title: string;
  copy: string;
  actions: Action[];
};

function ActionLink({ href, label, tone = "primary" }: Action) {
  const className = tone === "secondary" ? "button button-secondary" : "button button-primary";

  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

export function EditorialHero({ kicker, title, lead, imageSrc, imageAlt, imagePriority, actions, note }: HeroProps) {
  return (
    <section className="editorial-hero">
      <div className="editorial-hero-copy">
        <p className="ref-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {actions?.length ? (
          <div className="button-row">
            {actions.map((action) => (
              <ActionLink key={`${action.href}-${action.label}`} {...action} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="editorial-hero-visual">
        <div className="editorial-hero-frame">
          <Image
            alt={imageAlt}
            className="editorial-hero-image"
            fill
            priority={imagePriority}
            src={imageSrc}
          />
        </div>
        {note ? (
          <div className="editorial-hero-note">
            <span>{note.label}</span>
            <strong>{note.text}</strong>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function EditorialSectionIntro({ kicker, title, copy }: SectionIntroProps) {
  return (
    <div className="editorial-section-intro">
      <p className="ref-kicker">{kicker}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function EditorialClosingBand({ kicker, title, copy, actions }: ClosingBandProps) {
  return (
    <section className="editorial-close">
      <div className="editorial-close-copy">
        <p className="ref-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="editorial-close-actions">
        {actions.map((action) => (
          <ActionLink key={`${action.href}-${action.label}`} {...action} />
        ))}
      </div>
    </section>
  );
}
