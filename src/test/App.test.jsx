import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App.jsx'

function renderRoute(route = '/') {
  return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
}

describe('navigation and routes', () => {
  it.each([
    ['/', 'Professional Salon Services for Senior Living Communities'],
    ['/senior-living-communities', 'On-Site Salon Services for Senior Living Communities'],
    ['/services', 'Senior Hair Care Services'],
    ['/about', 'About Dominique'],
    ['/photos', 'Page Not Found'],
    ['/contact', 'Contact Us'],
    ['/missing', 'Page Not Found'],
  ])('renders %s', (route, heading) => {
    renderRoute(route)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('shows only the approved primary navigation links', () => {
    renderRoute('/')
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(nav.querySelectorAll('a')).toHaveLength(5)
    expect(nav).toHaveTextContent('Home')
    expect(nav).toHaveTextContent('Communities')
    expect(nav).toHaveTextContent('Services')
    expect(nav).toHaveTextContent('About')
    expect(nav).not.toHaveTextContent('Photos')
    expect(nav).toHaveTextContent('Contact Us')
    expect(nav).not.toHaveTextContent('Pay Online')
    expect(nav).not.toHaveTextContent('Register')
  })

  it('keeps the full navigation visible without a menu toggle', () => {
    renderRoute('/')
    expect(screen.queryByLabelText(/navigation menu/i)).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
  })

  it('uses the updated site-wide business copy while preserving the About biography', () => {
    const { unmount } = renderRoute('/')
    expect(screen.queryByText(/Professional Stylist.*Senior Hair Care/i)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Professional Salon Services for Senior Living Communities')
    unmount()

    renderRoute('/about')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Dominique')
    expect(screen.getByText(/Dominique Pitts is a licensed professional cosmetologist/i)).toBeInTheDocument()
  })

  it('renders compact service names without descriptions', () => {
    renderRoute('/services')
    const cards = document.querySelectorAll('.service-detail-card')
    expect(cards).toHaveLength(5)
    cards.forEach((card) => expect(card.querySelector('p')).not.toBeInTheDocument())
  })

  it('removes the memory-care FAQ and updates the community CTA', () => {
    renderRoute('/senior-living-communities')
    expect(document.querySelectorAll('.faq-list article')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Contact Naomi Gregory Salon, LLC about your community' })).toHaveAttribute('href', '/contact')
  })
})

describe('contact page', () => {
  it('provides direct contact links without a form', () => {
    renderRoute('/contact')
    const main = within(screen.getByRole('main'))
    expect(main.getByText('For more information please call or email Dominique at Naomi Gregory Salon, LLC.')).toBeInTheDocument()
    expect(main.getByRole('link', { name: '248-956-0236' })).toHaveAttribute('href', 'tel:+12489560236')
    expect(main.getByRole('link', { name: 'info@naomigregorysalon.com' })).toHaveAttribute('href', 'mailto:info@naomigregorysalon.com')
    expect(document.querySelector('form')).not.toBeInTheDocument()
  })

  it('does not claim submission when Thank You is opened directly', () => {
    renderRoute('/thank-you')
    expect(screen.queryByText(/submitted successfully/i)).not.toBeInTheDocument()
  })
})
