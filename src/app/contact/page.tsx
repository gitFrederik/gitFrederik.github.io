import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact — Frederik Willemsen" };

const CHANNELS = [
  { label: "Email",    value: "frederik.willemsen@tum.de",        href: "mailto:frederik.willemsen@tum.de", action: "copy" },
  { label: "LinkedIn", value: "linkedin.com/in/frederik-willemsen", href: "https://linkedin.com/in/frederik-willemsen", action: "open" },
  { label: "GitHub",   value: "github.com/frederikwillemsen",        href: "https://github.com/frederikwillemsen", action: "open" },
];

export default function ContactPage() {
  return (
    <>
      <header className="page-header" data-screen-label="06 Contact / Header">
        <div className="container">
          <div className="page-header__row">
            <div>
              <div className="eyebrow">Contact</div>
              <h1>Let&apos;s talk.</h1>
            </div>
            <div className="page-header__meta">
              <span><strong>Open</strong> · summer 2027 + full-time &apos;28</span>
              <span><strong>Reply time</strong> · within 24h</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container container-narrow">
          <Reveal className="contact-aside">
            <h2>Building <em>thoughtful AI systems</em>? Let&apos;s talk.</h2>
            <p className="lede">Email is fastest. LinkedIn works too. I read everything.</p>

            <div className="channels">
              {CHANNELS.map((c) => {
                const external = c.href.startsWith("http");
                return (
                  <a
                    key={c.label}
                    className="channel"
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    <span className="channel__label">{c.label}</span>
                    <span className="channel__value">{c.value}</span>
                    <span className="channel__action">
                      {c.action}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {external ? (
                          <>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </>
                        ) : (
                          <path d="M5 12h14M13 5l7 7-7 7"/>
                        )}
                      </svg>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="contact-meta">
              <div>
                <div className="k">Location</div>
                <div className="v">Munich, DE<small>open to relocate · EU/UK/US</small></div>
              </div>
              <div>
                <div className="k">Languages</div>
                <div className="v">German · English<small>native · C1</small></div>
              </div>
              <div>
                <div className="k">Time zone</div>
                <div className="v">CET / UTC+1<small>+2 in summer</small></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
