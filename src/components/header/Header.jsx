import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <a href="/" className="logo-link">
          {/* Using text if image fails to load or as fallback, but kept image structure */}
          <img
            src="/Logo-Bar-Churreria-Carmelo.jpg"
            alt="Churrería Carmelo"
            className="logo-image"
          />
        </a>

        <nav className="main-navigation">
          <ul className="nav-menu">
            <li><a href="/">Inicio</a></li>
            <li><a href="/historia">Nuestra Historia</a></li>
            <li><a href="/carta">Carta</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><Link to="/trabajanos">Trabaja con nosotros</Link></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          {/* Placeholder for "Order Now" or Socials */}
          <a href="/carta" className="cta-button-small">Pedir Ahora</a>
        </div>
      </div>
    </header>
  );
};

export default Header;