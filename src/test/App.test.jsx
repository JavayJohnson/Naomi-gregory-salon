import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'
import PhotoCarousel from '../components/PhotoCarousel.jsx'
import { validateContact } from '../utils/contactValidation.js'

function renderRoute(route = '/') {
  return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
}

describe('navigation and routes', () => {
  it.each([
    ['/', 'Simple Senior Hair Care with Compassion'],
    ['/about', 'About Dominique'],
    ['/photos', 'Photos'],
    ['/contact', 'Contact Us'],
    ['/missing', 'Page Not Found'],
  ])('renders %s', (route, heading) => {
    renderRoute(route)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('shows only the approved primary navigation links', () => {
    renderRoute('/')
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(nav.querySelectorAll('a')).toHaveLength(4)
    expect(nav).toHaveTextContent('Home')
    expect(nav).toHaveTextContent('About')
    expect(nav).toHaveTextContent('Photos')
    expect(nav).toHaveTextContent('Contact')
    expect(nav).not.toHaveTextContent('Pay Online')
    expect(nav).not.toHaveTextContent('Register')
  })

  it('opens, closes, and escapes the mobile menu', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    const toggle = screen.getByLabelText('Open navigation menu')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })
})

describe('contact form', () => {
  it('validates required fields and keeps telephone optional', async () => {
    const user = userEvent.setup()
    renderRoute('/contact')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))
    expect(screen.getAllByText('Enter your first name.')).toHaveLength(2)
    expect(screen.getAllByText('Enter your last name.')).toHaveLength(2)
    expect(screen.getAllByText('Enter your email address.')).toHaveLength(2)
    expect(screen.getAllByText('Enter a message.')).toHaveLength(2)
    expect(screen.queryByText(/valid telephone/i)).not.toBeInTheDocument()
  })

  it('accepts common telephone formatting', () => {
    const errors = validateContact({ firstName: 'Javay', lastName: 'Johnson', email: 'javay@example.com', telephone: '+1 (248) 956-0236', message: 'Hello' })
    expect(errors).toEqual({})
  })

  it('redirects only after successful server acceptance', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }))
    const user = userEvent.setup()
    renderRoute('/contact')
    await user.type(screen.getByLabelText(/First Name/), 'Javay')
    await user.type(screen.getByLabelText(/Last Name/), 'Johnson')
    await user.type(screen.getByLabelText(/Email Address/), 'javay@example.com')
    await user.type(screen.getByLabelText(/Message/), 'Please contact me.')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))
    expect(await screen.findByText(/submitted successfully/i)).toBeInTheDocument()
  })

  it('preserves input and stays on Contact after a failed request', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ success: false, message: 'Server unavailable.' }) }))
    const user = userEvent.setup()
    renderRoute('/contact')
    await user.type(screen.getByLabelText(/First Name/), 'Javay')
    await user.type(screen.getByLabelText(/Last Name/), 'Johnson')
    await user.type(screen.getByLabelText(/Email Address/), 'javay@example.com')
    await user.type(screen.getByLabelText(/Telephone Number/), '(248) 956-0236')
    await user.type(screen.getByLabelText(/Message/), 'Please contact me.')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))
    expect(await screen.findByText('Server unavailable.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
    expect(screen.getByLabelText(/Telephone Number/)).toHaveValue('(248) 956-0236')
  })

  it('does not claim submission when Thank You is opened directly', () => {
    renderRoute('/thank-you')
    expect(screen.queryByText(/submitted successfully/i)).not.toBeInTheDocument()
  })
})

describe('photo carousel', () => {
  const items = [
    { id: 'one', alt: 'Rear view of one hairstyle.', selected: 'original', sources: { original: '/one.jpeg' } },
    { id: 'two', alt: 'Rear view of another hairstyle.', selected: 'original', sources: { original: '/two.jpeg' } },
  ]

  it('scrolls automatically without visible carousel controls or filenames', async () => {
    vi.useFakeTimers()
    render(<PhotoCarousel photos={items} />)
    await act(async () => { vi.advanceTimersByTime(5000) })
    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: /previous photo|next photo|pause|resume/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/one\.jpeg|two\.jpeg/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
    vi.useRealTimers()
  })

  it('disables autoplay when reduced motion is requested', async () => {
    window.matchMedia.mockImplementation(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    render(<PhotoCarousel photos={items} />)
    await waitFor(() => expect(screen.getByRole('region', { name: 'Hairstyle photos' })).toBeInTheDocument())
    expect(screen.queryByRole('button', { name: /previous photo|next photo|pause|resume/i })).not.toBeInTheDocument()
  })
})
