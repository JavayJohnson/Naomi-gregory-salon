import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateContact } from '../utils/contactValidation.js'

const initialValues = { firstName: '', lastName: '', email: '', telephone: '', message: '', website: '' }
export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const startedAt = useRef(null)
  const summaryRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    startedAt.current = Math.floor(Date.now() / 1000)
  }, [])

  const update = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }))
    if (errors[target.name]) setErrors((current) => ({ ...current, [target.name]: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const nextErrors = validateContact(values)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setServerError('')
      window.setTimeout(() => summaryRef.current?.focus(), 0)
      return
    }

    setSubmitting(true)
    setServerError('')
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, form_started_at: startedAt.current }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(result.errors)
          window.setTimeout(() => summaryRef.current?.focus(), 0)
        }
        throw new Error(result.message || 'We could not send your message. Please try again or contact us by phone.')
      }
      navigate('/thank-you', { state: { accepted: true } })
    } catch (error) {
      setServerError(error.message || 'We could not send your message. Please try again or contact us by phone.')
    } finally {
      setSubmitting(false)
    }
  }

  const errorKeys = Object.keys(errors).filter((key) => errors[key])

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {errorKeys.length > 0 && (
        <div className="error-summary" role="alert" tabIndex="-1" ref={summaryRef}>
          <strong>Please correct the following:</strong>
          <ul>{errorKeys.map((key) => <li key={key}><a href={`#${key}`}>{errors[key]}</a></li>)}</ul>
        </div>
      )}
      {serverError && <p className="server-error" role="alert">{serverError}</p>}
      <div className="form-grid">
        <FormField id="firstName" label="First Name" required value={values.firstName} error={errors.firstName} onChange={update} maxLength={60} />
        <FormField id="lastName" label="Last Name" required value={values.lastName} error={errors.lastName} onChange={update} maxLength={60} />
        <FormField id="email" label="Email Address" type="email" required value={values.email} error={errors.email} onChange={update} maxLength={254} />
        <FormField id="telephone" label="Telephone Number" optional type="tel" value={values.telephone} error={errors.telephone} onChange={update} maxLength={30} />
        <div className="field field-full">
          <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
          <textarea id="message" name="message" required maxLength="3000" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
          {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field blank</label>
          <input id="website" name="website" tabIndex="-1" autoComplete="off" value={values.website} onChange={update} />
        </div>
      </div>
      <p><small><span aria-hidden="true">*</span> Required fields</small></p>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message'}</button>
        <span aria-live="polite">{submitting ? 'Your message is being submitted.' : ''}</span>
      </div>
    </form>
  )
}

function FormField({ id, label, optional, error, ...inputProps }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label} {optional ? <span className="optional">(Optional)</span> : <span aria-hidden="true">*</span>}</label>
      <input id={id} name={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...inputProps} />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
