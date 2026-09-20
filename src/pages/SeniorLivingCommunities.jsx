import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'

const partnershipBenefits = [
  { title: 'Experienced senior care', text: 'Naomi Gregory Salon, LLC brings more than 18 years of specialized experience serving older adults, including residents living with dementia and Alzheimer\'s disease.' },
  { title: 'A familiar on-site setting', text: 'Residents receive hair care in the salon already located within their community, reducing the need for off-site travel.' },
  { title: 'Professional peace of mind', text: 'Naomi Gregory Salon, LLC is fully licensed and insured, with more than 22 years of professional cosmetology experience.' },
]

export default function SeniorLivingCommunities() {
  return (
    <>
      <PageMeta title="On-Site Salon Services for Metro Detroit Senior Living Communities" description="Naomi Gregory Salon, LLC partners with Metro Detroit senior living communities that have an on-site salon and want compassionate, professional hair care for residents." path="/senior-living-communities" />
      <section className="content-hero facility-hero">
        <div className="container content-hero-inner">
          <p className="eyebrow">For executive directors and community leaders</p>
          <h1>On-Site Salon Services for Senior Living Communities</h1>
          <p>Naomi Gregory Salon, LLC is seeking partnerships with Metro Detroit communities that already have a salon on their property and want experienced, compassionate hair care for residents.</p>
          <div className="button-row"><Link className="button button-primary" to="/contact">Discuss Your Community</Link><a className="button" href="tel:+12489560236">Call 248-956-0236</a></div>
        </div>
      </section>
      <section className="page-section" aria-labelledby="partnership-title">
        <div className="container">
          <div className="section-intro"><p className="eyebrow">A resident-centered partnership</p><h2 id="partnership-title">Professional care for your residents, in your salon</h2><p>Naomi Gregory Salon, LLC combines cosmetology experience with patience, respect, and an understanding of the needs of older adults.</p></div>
          <div className="feature-grid">
            {partnershipBenefits.map(({ title, text }) => <article className="feature-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="process-section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-intro"><h2 id="process-title">Starting the conversation</h2><p>Every community is different. The first step is a simple discussion about your salon space, resident population, and service needs.</p></div>
          <ol className="process-grid">
            <li><span>1</span><div><h3>Tell us about your community</h3><p>Share your Metro Detroit location, salon setup, and the residents your community supports.</p></div></li>
            <li><span>2</span><div><h3>Discuss resident needs</h3><p>Review the hair services your residents request and the care considerations that matter to your team.</p></div></li>
            <li><span>3</span><div><h3>Determine the right fit</h3><p>Naomi Gregory Salon, LLC will discuss whether its experience and services align with your community's needs.</p></div></li>
          </ol>
        </div>
      </section>
      <section className="faq-section page-section" aria-labelledby="faq-title">
        <div className="container narrow-container">
          <div className="section-intro"><h2 id="faq-title">Questions from senior living communities</h2></div>
          <div className="faq-list">
            <article><h3>Does the community need an existing salon?</h3><p>Yes. Naomi Gregory Salon, LLC is currently seeking senior living communities with an established salon space on their property.</p></article>
            <article><h3>What area does Naomi Gregory Salon, LLC serve?</h3><p>The current partnership focus is senior living communities throughout the Metro Detroit area.</p></article>
            <article><h3>What services are available?</h3><p>Services include shampoo sets, blowouts, women's haircuts, men's haircuts, and chemical services. Community-specific needs can be discussed directly.</p></article>
          </div>
          <div className="centered-action"><Link className="button button-primary" to="/contact">Contact Naomi Gregory Salon, LLC about your community</Link></div>
        </div>
      </section>
    </>
  )
}
