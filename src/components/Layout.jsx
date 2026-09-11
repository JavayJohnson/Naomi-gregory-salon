import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content" ref={mainRef} tabIndex="-1"><Outlet /></main>
      <Footer />
    </div>
  )
}
