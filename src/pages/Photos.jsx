import PageMeta from '../components/PageMeta.jsx'
import PhotoCarousel from '../components/PhotoCarousel.jsx'
import { photos } from '../data/photos.js'

export default function Photos() {
  return (
    <>
      <PageMeta title="Photos" description="Browse hairstyle photos from Naomi Gregory Salon, featuring polished cuts, color, curls, and senior hair care." path="/photos" />
      <section className="page-section">
        <div className="container">
          <h1 className="page-heading">Photos</h1>
          <p className="photos-intro">Thoughtful styling, personalized care, and polished results designed to help every client look and feel their best.</p>
          <PhotoCarousel photos={photos} />
          <div className="care-note"><span className="care-heart" aria-hidden="true">♡</span><span>Personalized care. Compassionate service. Styles that help you look and feel your best.</span></div>
        </div>
      </section>
    </>
  )
}
