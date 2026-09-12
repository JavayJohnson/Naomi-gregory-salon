import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="Naomi Gregory Salon home" onClick={() => setOpen(false)}>
          <span className="wordmark">Naomi<br />Gregory<br />Salon</span>
          <span className="tagline">Professional Stylist<br />Specializing in<br />Senior Hair Care</span>
        </NavLink>
        <nav id="primary-menu" ref={navRef} className={`primary-nav${open ? ' open' : ''}`} aria-label="Primary navigation">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end={link.end} to={link.to} onClick={() => setOpen(false)}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={buttonRef}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-lines" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
