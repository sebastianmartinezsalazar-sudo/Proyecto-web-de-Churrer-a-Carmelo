// src/pages/historia/Historia.jsx
import './Historia.css';

const Historia = () => {
  return (
    <div className="historia-page">
      {/* Hero Section */}
      <section className="historia-hero">
        <div className="historia-hero-content">
          <h1>Nuestra Historia</h1>
          <p className="hero-subtitle">Tradición y pasión desde 1985</p>
        </div>
      </section>

      {/* Main Story */}
      <section className="historia-content section">
        <div className="container">
          <div className="historia-text">
            <h2>El Inicio de un Sueño</h2>
            <p>
              En 1985, la familia García abrió las puertas de Churrería Carmelo en el corazón 
              de Las Palmas de Gran Canaria. Lo que comenzó como un pequeño negocio familiar, 
              pronto se convirtió en un referente de la churrería tradicional en la isla.
            </p>
            <p>
              Nuestro fundador, con décadas de experiencia en la elaboración artesanal de churros, 
              decidió compartir su pasión por este delicioso manjar. Cada mañana, desde antes del 
              amanecer, preparábamos la masa fresca con ingredientes seleccionados y el mismo 
              cuidado de siempre.
            </p>
          </div>

          <div className="historia-image">
            <img src="/churros.jpg" alt="Nuestra historia" className="historia-img" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="historia-values section">
        <div className="container">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Calidad</h3>
              <p>Utilizamos solo ingredientes frescos y de primera calidad. Nuestro aceite se renueva constantemente para garantizar el mejor sabor.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Pasión</h3>
              <p>Cada churro está hecho con amor y dedicación, manteniendo viva la tradición familiar que nos caracteriza.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Compromiso</h3>
              <p>Nos comprometemos con nuestros clientes a ofrecer un producto excepcional y un servicio cercano y familiar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="historia-timeline section">
        <div className="container">
          <h2 className="section-title">Nuestro Recorrido</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1985</div>
              <div className="timeline-content">
                <h3>Apertura</h3>
                <p>Nace Churrería Carmelo en Las Palmas de Gran Canaria</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1995</div>
              <div className="timeline-content">
                <h3>Expansión</h3>
                <p>Ampliamos el local e incorporamos servicio de catering para eventos</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <h3>Segunda Generación</h3>
                <p>La familia García continúa la tradición con nuevas ideas manteniendo la esencia</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>40 Años</h3>
                <p>Celebramos cuatro décadas endulzando los desayunos y meriendas de nuestros clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Historia;