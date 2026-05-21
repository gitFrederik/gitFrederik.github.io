/* eslint-disable @next/next/no-img-element */

export type MarqueeLogo = {
  src: string;
  alt: string;
  tall?: boolean;
};

const DEFAULT_LOGOS: MarqueeLogo[] = [
  { src: "/logos/tum.svg",      alt: "Technical University of Munich", tall: true  },
  { src: "/logos/ucdavis.png",  alt: "UC Davis",                       tall: false },
  { src: "/logos/tumai.svg",    alt: "TUM.ai",                         tall: true  },
  { src: "/logos/deloitte.png", alt: "Deloitte",                       tall: false },
  { src: "/logos/check24.png",  alt: "Check24",                        tall: false },
];

function LogoRow({ logos, ariaHidden }: { logos: MarqueeLogo[]; ariaHidden?: boolean }) {
  return (
    <div className="marquee__list" aria-hidden={ariaHidden || undefined}>
      {logos.map((l, i) => (
        <div
          key={`${l.src}-${i}`}
          className={`marquee__item ${l.tall ? "marquee__item--tall" : ""}`}
        >
          <img src={l.src} alt={ariaHidden ? "" : l.alt} aria-hidden={ariaHidden || undefined} />
        </div>
      ))}
    </div>
  );
}

type LogoMarqueeProps = {
  logos?: MarqueeLogo[];
  eyebrow?: string;
  ariaLabel?: string;
};

export function LogoMarquee({
  logos = DEFAULT_LOGOS,
  eyebrow = "Studied · shipped at",
  ariaLabel = "Studied and worked at",
}: LogoMarqueeProps) {
  return (
    <section className="marquee" aria-label={ariaLabel}>
      <div className="container marquee__head">
        <span className="eyebrow eyebrow--no-rule">{eyebrow}</span>
        <span className="marquee__hint" aria-hidden="true">scroll →</span>
      </div>
      <div className="marquee__viewport">
        <div className="marquee__track">
          <LogoRow logos={logos} />
          <LogoRow logos={logos} ariaHidden />
          <LogoRow logos={logos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
