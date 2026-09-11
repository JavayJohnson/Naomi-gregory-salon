import ContactForm from '../components/ContactForm.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact" description="Contact Naomi Gregory Salon for compassionate, professional senior hair care." path="/contact" />
      <section className="page-section">
        <div className="container contact-layout">
          <div className="contact-intro">
            <h1>Contact Us</h1>
            <p>We would be happy to hear from you. Call, text, email, or send a message using the form.</p>
            <div className="contact-details">
              <div className="contact-detail"><strong>Call or Text</strong><a href="tel:+12489560236">248-956-0236</a></div>
              <div className="contact-detail"><strong>Email Us</strong><a href="mailto:info@naomigregorysalon.com">info@naomigregorysalon.com</a></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
