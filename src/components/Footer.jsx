import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-contacts">
          <div className="footer-contact">
            <span className="footer-contact-icon" aria-hidden="true">☎</span>
            <div><a href="tel:+12489560236">248-956-0236</a><span>Call or Text</span></div>
          </div>
          <div className="footer-contact">
            <span className="footer-contact-icon" aria-hidden="true">✉</span>
            <div><a href="mailto:info@naomigregorysalon.com">info@naomigregorysalon.com</a><span>Email Us</span></div>
          </div>
        </div>
        <p className="footer-service-area">Professional salon services for senior living communities throughout Metro Detroit.</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/senior-living-communities">For Communities</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Dominique</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Naomi Gregory Salon, LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
