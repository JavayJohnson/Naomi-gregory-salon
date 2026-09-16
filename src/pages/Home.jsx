import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
const portrait = '/images/dominique-professional-portrait.webp'

export default function Home() {
  return (
    <>
      <PageMeta title="Metro Detroit Senior Living Salon Services" description="Professional senior hair care for Metro Detroit senior living communities with an existing on-site salon. Licensed and insured cosmetologist Dominique Pitts provides compassionate resident-centered care." path="/" />
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="portrait-frame">
            <img className="portrait-image" src={portrait} width="1200" height="1500" fetchPriority="high" decoding="async" alt="Dominique Pitts, owner and professional cosmetologist at Naomi Gregory Salon, LLC." />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Serving Metro Detroit</p>
            <h1>Professional Salon Services for Metro Detroit Senior Living Communities</h1>
            <p>Naomi Gregory Salon, LLC partners with senior living communities that have an on-site salon, bringing residents compassionate hair care in a familiar, comfortable setting.</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/senior-living-communities">For Senior Living Communities</Link>
              <a className="button" href="tel:+12489560236">Call or Text Dominique</a>
            </div>
            <div className="credential-panel"><span className="credential-mark" aria-hidden="true">✓</span><span>22+ years as a licensed cosmetologist, including 18+ years specializing in senior hair care.</span></div>
          </div>
        </div>
      </section>
      <section className="audience-section" aria-labelledby="community-care-title">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Resident-centered salon care</p>
            <h2 id="community-care-title">A professional salon experience within your community</h2>
            <p>Dominique works in established salon spaces inside senior living communities, helping facility leaders offer convenient, respectful hair care without requiring residents to leave home.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card"><h3>On-site salon partnership</h3><p>Services are designed for communities that already have a dedicated salon space on their property.</p></article>
            <article className="feature-card"><h3>Senior-focused experience</h3><p>More than 18 years of specialized experience includes supporting residents living with dementia and Alzheimer's disease.</p></article>
            <article className="feature-card"><h3>Licensed and insured</h3><p>Communities and families can feel confident working with an experienced professional cosmetologist.</p></article>
          </div>
          <div className="centered-action"><Link className="button button-primary" to="/services">Explore Senior Hair Services</Link></div>
        </div>
      </section>
    </>
  )
}
