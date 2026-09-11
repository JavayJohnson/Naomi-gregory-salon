import PageMeta from '../components/PageMeta.jsx'
import portrait from '../../design-references/original-images/Dominique Selfie Pic.jpg'

export default function Home() {
  return (
    <>
      <PageMeta title="Naomi Gregory Salon" description="Personalized, compassionate senior hair care from professional cosmetologist Dominique Pitts." path="/" />
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="portrait-frame">
            <img className="portrait-image" src={portrait} alt="Dominique Pitts, owner and professional cosmetologist at Naomi Gregory Salon." />
          </div>
          <div className="hero-copy">
            <h1>Simple Senior Hair Care with Compassion</h1>
            <p>Personalized care in a calm, comfortable environment—because every senior deserves to look and feel their best.</p>
            <div className="credential-panel"><span className="credential-mark" aria-hidden="true">✓</span><span>Naomi Gregory Salon is fully licensed and insured.</span></div>
          </div>
        </div>
      </section>
    </>
  )
}
