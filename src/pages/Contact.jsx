import PageMeta from '../components/PageMeta.jsx'

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact a Metro Detroit Senior Living Hairstylist" description="Contact Naomi Gregory Salon, LLC to discuss professional salon services for residents at a Metro Detroit senior living community with an existing on-site salon." path="/contact" />
      <section className="page-section">
        <div className="container contact-layout">
          <div className="contact-intro">
            <p className="eyebrow">Senior living community partnerships</p>
            <h1 className="page-heading">Contact Us</h1>
            <p>For more information please call or email Dominique at Naomi Gregory Salon, LLC.</p>
          </div>
          <div className="contact-details">
            <div className="contact-detail"><strong>Call or Text</strong><a href="tel:+12489560236">248-956-0236</a></div>
            <div className="contact-detail"><strong>Email Us</strong><a href="mailto:info@naomigregorysalon.com">info@naomigregorysalon.com</a></div>
          </div>
        </div>
      </section>
    </>
  )
}
