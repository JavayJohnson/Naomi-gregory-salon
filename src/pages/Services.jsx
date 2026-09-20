import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'

const services = [
  'Shampoo Sets',
  'Blowouts',
  "Women's Haircuts",
  "Men's Haircuts",
  'Chemical Services',
]

export default function Services() {
  return (
    <>
      <PageMeta title="Senior Hair Care Services for Senior Living Communities" description="Explore compassionate shampoo sets, blowouts, haircuts, and chemical services provided inside Metro Detroit senior living community salons." path="/services" />
      <section className="content-hero">
        <div className="container content-hero-inner">
          <p className="eyebrow">Salon services for older adults</p>
          <h1>Senior Hair Care Services</h1>
          <p>Professional hair care is provided within salons at Metro-Detroit senior living communities, creating a convenient and familiar experience for residents.</p>
        </div>
      </section>
      <section className="services-section page-section" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="section-heading">Services Available</h2>
          <div className="service-detail-grid">
            {services.map((service) => (
              <article className="service-detail-card" key={service}>
                <h3>{service}</h3>
              </article>
            ))}
          </div>
          <div className="care-note"><span className="care-heart" aria-hidden="true">♡</span><span>Compassionate care. Professional results. A salon experience designed with seniors in mind.</span></div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container cta-inner"><div><p className="eyebrow">For facility leaders</p><h2>Does your community have an on-site salon?</h2><p>Contact Naomi Gregory Salon, LLC to discuss resident needs and whether the salon may be a good fit.</p></div><Link className="button button-primary" to="/contact">Start a Conversation</Link></div>
      </section>
    </>
  )
}
