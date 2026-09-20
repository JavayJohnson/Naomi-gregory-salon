import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'

const portrait = '/images/owner-professional-portrait.webp'

export default function About() {
  return (
    <>
      <PageMeta title="About Dominique Pitts, Senior Living Cosmetologist" description="Meet Dominique Pitts, a licensed Metro Detroit cosmetologist with more than 22 years of experience and 18 years specializing in compassionate senior hair care." path="/about" />
      <section className="page-section">
        <div className="container about-grid">
          <div className="portrait-frame"><img className="portrait-image" src={portrait} width="1200" height="1500" loading="lazy" decoding="async" alt="Dominique Pitts, owner and professional cosmetologist at Naomi Gregory Salon, LLC." /></div>
          <div className="about-copy">
            <p className="eyebrow">Experience with compassion</p>
            <h1>About Dominique</h1>
            <p>Dominique Pitts is a licensed professional cosmetologist and the owner of Naomi Gregory Salon, LLC. She is seeking partnerships with Metro Detroit senior living communities that have an on-site salon space.</p>
            <p>With more than 22 years of experience as a cosmetologist and more than 18 years specializing in senior hair care, Dominique understands that a salon visit can support dignity, confidence, routine, and personal connection.</p>
            <p>Her experience includes working compassionately with older adults living with dementia and Alzheimer's disease. Naomi Gregory Salon, LLC is fully licensed and insured.</p>
            <div className="button-row button-row-left">
              <Link className="button button-primary" to="/senior-living-communities">Learn About Community Partnerships</Link>
              <Link className="button" to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="values-section" aria-labelledby="values-title">
        <div className="container">
          <div className="section-intro"><h2 id="values-title">Care guided by professionalism and respect</h2></div>
          <div className="feature-grid">
            <article className="feature-card"><h3>Compassion</h3><p>Every resident receives patient, attentive care in a calm salon environment.</p></article>
            <article className="feature-card"><h3>Professionalism</h3><p>Communities can expect dependable communication and services grounded in cosmetology experience.</p></article>
            <article className="feature-card"><h3>Dignity</h3><p>Hair care is approached as a meaningful part of each resident's comfort, identity, and well-being.</p></article>
          </div>
        </div>
      </section>
    </>
  )
}
