import PageMeta from '../components/PageMeta.jsx'
const portrait = '/images/dominique-professional-portrait.webp'

const services = [['✦', 'Shampoo Set'], ['◌', 'Blowout'], ['✂', 'Women’s Haircut'], ['▥', 'Men’s Haircut'], ['⚗', 'Chemical Services']]

export default function About() {
  return (
    <>
      <PageMeta title="About Dominique" description="Meet Dominique Pitts and learn about the compassionate senior hair-care services at Naomi Gregory Salon." path="/about" />
      <section className="page-section">
        <div className="container about-grid">
          <div className="portrait-frame"><img className="portrait-image" src={portrait} alt="Dominique Pitts, owner and professional cosmetologist at Naomi Gregory Salon." /></div>
          <div className="about-copy">
            <h1>About Dominique</h1>
            <p>Dominique Pitts is a professional cosmetologist specializing in senior hair care and the owner of Naomi Gregory Salon.</p>
            <p>With more than 22 years of experience as a licensed cosmetologist and more than 18 years of specialized experience working with seniors, including residents with dementia and Alzheimer’s disease, Dominique is passionate about providing personalized, compassionate care.</p>
            <p>Naomi Gregory Salon is fully licensed and insured, giving you peace of mind with every visit.</p>
          </div>
        </div>
      </section>
      <section className="services-section" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="section-heading">Services</h2>
          <div className="service-grid">
            {services.map(([icon, name]) => <article className="service-card" key={name}><span className="service-icon" aria-hidden="true">{icon}</span><h3>{name}</h3></article>)}
          </div>
          <div className="care-note"><span className="care-heart" aria-hidden="true">♡</span><span>Compassionate care. Professional results. A salon experience made for seniors.</span></div>
        </div>
      </section>
    </>
  )
}
