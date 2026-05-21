import Link from "next/link";
import { Spike } from "./Spike";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <span className="footer__spike"><Spike /></span>
          <span className="footer__mark">Frederik Willemsen</span>
        </div>
        <div className="footer__grid">
          <div className="footer__col">
            <p className="footer__lede">
              Software &amp; AI engineer in training. Currently building thoughtful systems at TUM.ai.
            </p>
          </div>
          <div className="footer__col">
            <h5>Site</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/projects">Work</Link></li>
              <li><Link href="/experience">Experience</Link></li>
              <li><Link href="/academic">Academic path</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Connect</h5>
            <ul>
              <li><a href="mailto:frederik.willemsen@tum.de">Email</a></li>
              <li><a href="https://linkedin.com/in/frederik-willemsen" rel="noopener" target="_blank">LinkedIn</a></li>
              <li><a href="https://github.com/frederikwillemsen" rel="noopener" target="_blank">GitHub</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Elsewhere</h5>
            <ul>
              <li><a href="https://scholar.google.com" rel="noopener" target="_blank">Google Scholar</a></li>
              <li><Link href="/contact">Get in touch</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="anthropic-mark">© 2026 Frederik M. Willemsen · Munich</span>
          <span className="anthropic-mark">Designed in the spirit of the Anthropic system</span>
        </div>
      </div>
    </footer>
  );
}
