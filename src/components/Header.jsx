import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/senior-living-communities', label: 'Communities' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="Naomi Gregory Salon, LLC home">
          <span className="wordmark">Naomi<br />Gregory<br />Salon, LLC</span>
        </NavLink>
        <nav className="primary-nav" aria-label="Primary navigation">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end={link.end} to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
