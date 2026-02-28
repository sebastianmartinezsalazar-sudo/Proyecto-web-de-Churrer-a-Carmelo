// src/pages/home/Home.jsx
import ProductGrid from '../../components/product-grid/ProductGrid';
import './Home.css';
import SpecialtyCard from '../../components/specialty-card/SpecialtyCard';
import MapComponent from '../../components/map/MapComponent';

const specialties = [
  {
    title: "Chocolate con Churros",
    description: "El clásico que nunca falla. Chocolate espeso y churros crujientes.",
    icon: "🍫"
  },
  {
    title: "Sandwiches y Bocadillos",
    description: "Variedad de bocadillos fríos y calientes preparados al momento.",
    icon: "🥪"
  },
  {
    title: "Servicio de Catering",
    description: "Llevamos nuestros churros a tus eventos más especiales.",
    icon: "🎉"
  }
];

const Home = () => {
  return (
    <div className="home-page">

      {/* 1. Hero Section */}
      <section className="hero-section">
  <div className="hero-overlay">
    <div className="hero-content">
      <div className="hero-title-wrapper">
        <h1>Churrería Carmelo</h1>
      </div>
      <p className="hero-subtitle">Tradición y sabor en cada bocado</p>
      <div className="hero-buttons">
        <a href="/carta" className="btn btn-primary">Ver Carta</a>
        <a href="/contacto" className="btn btn-secondary">Visítanos</a>
      </div>
    </div>
  </div>
</section>

      {/* 2. Intro/Story Section */}
      <section className="section intro-section">
        <div className="container intro-container">
          <div className="intro-text">
            <h2>Pasión por los Churros</h2>
            <p>
              Desde 1985, en Churrería Carmelo hemos dedicado nuestra vida a perfeccionar
              el arte de hacer churros. Nuestro secreto reside en la masa fresca hecha a diario,
              el aceite limpio y el cariño que ponemos en cada pedido.
            </p>
            <p>
              Ya sea para desayunar con un buen chocolate caliente o para merendar en familia,
              nuestra casa es tu casa.
            </p>
            {/* Link to history could be added here if page existed */}
          </div>
          <div className="intro-image">
            {/* Placeholder until real image is confirmed try to use local image if possible */}
            <img src="/churros.jpg" alt="Churrería Carmelo Churros" className="intro-img-fluid" onError={(e) => e.target.style.display = 'none'} />
            {/* Fallback text if image fails is handled by css or alt text, but keeping it simple */}
          </div>
        </div>
      </section>

      {/* 3. Products Highlight (Menu) - JSON Array & Props Usage */}
      <section className="section products-section">
        <div className="container">
          <h2 className="section-title">Nuestras Especialidades</h2>
          <div className="products-grid">
            {specialties.map((item, index) => (
              <SpecialtyCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className="center-btn">
            <a href="/carta" className="btn btn-primary">Ver Menú Completo</a>
          </div>
        </div>
      </section>
      <section className="section firebase-products-section">
        <div className="container">
          <h2 className="section-title">Nuestros Productos</h2>
          <ProductGrid />
        </div>
      </section>

      {/* 4. Events/Services - Kept as static for now, or could match 3rd item in array */}

      {/* 5. Location/Contact Preview - Map Component Usage */}
      <section className="section location-section">
        <div className="container">
          <h2 className="section-title">Ven a Vernos</h2>
          <div className="location-grid">
            <div className="location-info">
              <h3>Las Palmas</h3>
              <p>Carretera General del Norte 112</p>
              <p>35013 Las Palmas de Gran Canaria, España</p>
              <p><strong>Horario:</strong> Lunes a Domingo, 09:00 - 22:00</p>
              <a href="tel:+34928420330" className="phone-link">📞 +34 928 420 330</a>
              <p>✉️ gerencia@gemelosgarcia.com</p>
            </div>
            <div className="map-container-wrapper">
              <MapComponent />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
