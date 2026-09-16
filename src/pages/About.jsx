import PageMeta from '../components/PageMeta.jsx'

const portrait = '/images/dominique-professional-portrait.webp'

const services = [
  { icon: 'shampoo', name: 'Shampoo Set' },
  { icon: 'dryer', name: 'Blowout' },
  { icon: 'scissors', name: 'Women’s Haircut' },
  { icon: 'clippers', name: 'Men’s Haircut' },
  { icon: 'products', name: 'Chemical Services' },
]

function ServiceIcon({ type }) {
  const commonProps = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (type === 'shampoo') {
    return (
      <svg {...commonProps}>
        <circle cx="17" cy="15" r="3" />
        <circle cx="25" cy="10" r="2" />
        <circle cx="31" cy="16" r="2.5" />
        <path d="M16 29c1-8 8-12 15-8 3 2 5 5 5 9" />
        <path d="M17 28c4 4 11 5 18 2" />
        <path d="M37 25h13c0 8-5 13-13 13h-7" />
        <path d="M48 25v-5m-4 0h8" />
        <path d="M25 34c-5 2-8 7-8 14v6m13-16v16m-13-8h13" />
      </svg>
    )
  }

  if (type === 'dryer') {
    return (
      <svg {...commonProps}>
        <path d="M12 19h23c8 0 14 5 14 12s-6 12-14 12H12z" />
        <path d="M12 23 5 26v10l7 3" />
        <circle cx="38" cy="31" r="6" />
        <path d="M31 43 27 57h11l4-15" />
        <path d="M51 24c4 2 6 4 8 7m-8 7c4-2 6-4 8-7" />
      </svg>
    )
  }

  if (type === 'scissors') {
    return (
      <svg {...commonProps}>
        <circle cx="17" cy="47" r="8" />
        <circle cx="47" cy="47" r="8" />
        <path d="m22 41 28-31M42 41 14 10M28 32l8 9" />
      </svg>
    )
  }

  if (type === 'clippers') {
    return (
      <svg {...commonProps}>
        <path d="M23 15h18l3 8v28c0 4-3 7-7 7H27c-4 0-7-3-7-7V23z" />
        <path d="M22 15V7m5 8V7m5 8V7m5 8V7m5 8V7" />
        <path d="M26 31h12M32 31v10" />
        <circle cx="32" cy="47" r="2" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M11 20h19v37H11zM14 20v-7h13v7M17 13V7h9" />
      <path d="M38 35h16c3 0 5 2 5 5v12c0 3-2 5-5 5H38c-3 0-5-2-5-5V40c0-3 2-5 5-5Z" />
      <path d="M36 35v-4h20v4M39 46h14" />
      <path d="M17 29h7" />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <PageMeta title="About Dominique" description="Meet Dominique Pitts and learn about the compassionate senior hair-care services at Naomi Gregory Salon, LLC." path="/about" />
      <section className="page-section">
        <div className="container about-grid">
          <div className="portrait-frame"><img className="portrait-image" src={portrait} alt="Dominique Pitts, owner and professional cosmetologist at Naomi Gregory Salon, LLC." /></div>
          <div className="about-copy">
            <h1>About Dominique</h1>
            <p>Dominique Pitts is a professional cosmetologist specializing in senior hair care and the owner of Naomi Gregory Salon, LLC.</p>
            <p>With more than 22 years of experience as a licensed cosmetologist and more than 18 years of specialized experience working with seniors, including residents with dementia and Alzheimer’s disease, Dominique is passionate about providing personalized, compassionate care.</p>
            <p>Naomi Gregory Salon, LLC is fully licensed and insured, giving you peace of mind with every visit.</p>
          </div>
        </div>
      </section>
      <section className="services-section" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="section-heading">Services</h2>
          <div className="service-grid">
            {services.map(({ icon, name }) => (
              <article className="service-card" key={name}>
                <span className="service-icon"><ServiceIcon type={icon} /></span>
                <h3>{name}</h3>
              </article>
            ))}
          </div>
          <div className="care-note"><span className="care-heart" aria-hidden="true">♡</span><span>Compassionate care. Professional results. A salon experience made for seniors.</span></div>
        </div>
      </section>
    </>
  )
}
