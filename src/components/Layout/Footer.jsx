import { PORTFOLIO_INFO } from '../../constants/portfolio'
import './Footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__bottom">
          <p>&copy; {currentYear} {PORTFOLIO_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
