import { PORTFOLIO_INFO } from '../../constants/portfolio'
import './Footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const siteName = 'Preeti'
  const socialLinks = {
    instagram: PORTFOLIO_INFO.social?.instagram || 'https://instagram.com',
    linkedin: PORTFOLIO_INFO.social?.linkedin || 'https://www.linkedin.com/in/i-preeti/',
    facebook: PORTFOLIO_INFO.social?.facebook || 'https://facebook.com',
  }

  return (
    <footer className="footer">
      <div className="container px-8">
        <div className="footer__bottom">
          <div className="footer__left">
            <p className="footer__brand">{siteName}</p>
            <p className="footer__copyright">&copy; {currentYear} All rights reserved.</p>
          </div>

          <div className="footer__right ">
            <nav className="footer__legal" aria-label="Footer legal links">
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#terms-and-conditions">Terms &amp; Conditions</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="footer__social mt-1" aria-label="Social media links">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5a3.96 3.96 0 0 0 3.95 3.95h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z" />
                </svg>
              </a>

              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96zM3 9.5h3.96V21H3V9.5zm7.16 0h3.8v1.57h.06c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.08V21h-3.96v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76V21h-3.96V9.5z" />
                </svg>
              </a>

              {/* <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 21v-7h2.35l.4-3h-2.75V9.2c0-.87.24-1.46 1.49-1.46h1.59V5.06A21 21 0 0 0 14.25 5C11.93 5 10.5 6.4 10.5 8.95V11H8v3h2.5v7h3z" />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
