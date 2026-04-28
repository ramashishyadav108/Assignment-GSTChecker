import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        GST Intelligence
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/gst-search" className="nav-link">GST Search</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn btn-outline-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="btn btn-primary-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
