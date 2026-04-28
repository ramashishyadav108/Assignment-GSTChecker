import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>GST Intelligence Platform</h1>
        <p>Instantly look up GST registration details and filing history for any GSTIN across India.</p>
        {user ? (
          <Link to="/gst-search" className="btn-cta">Search GSTIN Now</Link>
        ) : (
          <div className="cta-group">
            <Link to="/signup" className="btn-cta">Get Started</Link>
            <Link to="/login" className="btn-cta-outline">Sign In</Link>
          </div>
        )}
      </div>

      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">&#128269;</div>
          <h3>Registration Details</h3>
          <p>Fetch trade name, legal name, address, jurisdiction, goods &amp; services, and more.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">&#128196;</div>
          <h3>Filing History</h3>
          <p>Track GSTR filings, compliance status, delays, and return periods year-by-year.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">&#128274;</div>
          <h3>Secure Access</h3>
          <p>All data is protected behind JWT authentication — only verified users can search.</p>
        </div>
      </div>
    </div>
  );
}
