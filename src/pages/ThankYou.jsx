import { Link, useLocation } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'

export default function ThankYou() {
  const accepted = useLocation().state?.accepted === true
  return (
    <>
      <PageMeta title="Thank You" description="Thank you for contacting Naomi Gregory Salon." path="/thank-you" />
      <section className="page-section">
        <div className="container simple-page">
          <h1>Thank You</h1>
          {accepted ? <p>Your message was submitted successfully. Naomi Gregory Salon will respond as soon as possible.</p> : <p>This confirmation page is shown only after the contact form is accepted. If you still need to send a message, please visit the Contact page.</p>}
          <div className="button-row"><Link className="button button-primary" to="/">Back to Home</Link></div>
        </div>
      </section>
    </>
  )
}
