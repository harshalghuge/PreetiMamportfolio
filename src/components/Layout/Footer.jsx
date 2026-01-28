import { PORTFOLIO_INFO } from '../../constants/portfolio'
import './Footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>About</h3>
            <p>{PORTFOLIO_INFO.description}</p>
          </div>

          <div className="footer__section">
            <h3>Quick Links</h3>
            <ul className="footer__links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h3>Connect</h3>
            <ul className="footer__social">
              <li>
                <a href={PORTFOLIO_INFO.social.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={PORTFOLIO_INFO.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={PORTFOLIO_INFO.social.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} {PORTFOLIO_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
