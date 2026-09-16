import ContactForm from '../components/ContactForm.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact a Metro Detroit Senior Living Hairstylist" description="Contact Dominique Pitts to discuss professional salon services for residents at a Metro Detroit senior living community with an existing on-site salon." path="/contact" />
      <section className="page-section">
        <div className="container contact-layout">
          <div className="contact-intro">
            <p className="eyebrow">Senior living community partnerships</p>
            <h1>Contact Us</h1>
            <p>If you manage a Metro Detroit senior living community with an on-site salon, contact Dominique to discuss your residents, salon space, and hair care needs.</p>
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
