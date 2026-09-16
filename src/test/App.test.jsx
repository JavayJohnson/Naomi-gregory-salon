import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'
import { validateContact } from '../utils/contactValidation.js'

function renderRoute(route = '/') {
  return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
}

describe('navigation and routes', () => {
  it.each([
    ['/', 'Professional Salon Services for Metro Detroit Senior Living Communities'],
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
    expect(nav).toHaveTextContent('Contact')
    expect(nav).not.toHaveTextContent('Pay Online')
    expect(nav).not.toHaveTextContent('Register')
  })

  it('keeps the full navigation visible without a menu toggle', () => {
    renderRoute('/')
    expect(screen.queryByLabelText(/navigation menu/i)).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
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
