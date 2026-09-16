import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found" description="The requested Naomi Gregory Salon, LLC page could not be found." path="/404" />
      <section className="page-section"><div className="container simple-page"><h1>Page Not Found</h1><p>The page you requested does not exist or may have moved.</p><Link className="button button-primary" to="/">Return Home</Link></div></section>
    </>
  )
}
