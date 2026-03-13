import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Trabajanos.css';

const Trabajanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    experiencia: '',
    puesto: '',
    mensaje: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Por favor, sube un archivo PDF o imagen (JPG/PNG)');
        return;
      }
      
      // Validar tamaño máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo no debe superar los 5MB');
        return;
      }
      
      setCvFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simular envío (aquí podrías conectar con Firebase o EmailJS)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mostrar mensaje de éxito
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Resetear formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      experiencia: '',
      puesto: '',
      mensaje: ''
    });
    setCvFile(null);

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className="trabajanos-page">
      {/* Hero Section */}
      <section className="trabajanos-hero">
        <div className="hero-content">
          <h1> Trabaja con Nosotros</h1>
          <p>Únete al equipo de Churrería Carmelo</p>
          <Link to="/carta" className="hero-btn">Ver Nuestro Menú</Link>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="why-work-section">
        <div className="container">
          <h2>¿Por qué trabajar con nosotros?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">👨‍‍👦</div>
              <h3>Ambiente Familiar</h3>
              <p>Forma parte de un equipo cercano y comprometido con más de 30 años de experiencia</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3>Formación</h3>
              <p>Aprende el arte de la churrería tradicional y la atención al cliente</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Buen Salario</h3>
              <p>Remuneración competitiva según experiencia y beneficios adicionales</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⏰</div>
              <h3>Horario Flexible</h3>
              <p>Adaptamos los turnos a tus necesidades (mañana/tarde)</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Estabilidad</h3>
              <p>Contrato estable y oportunidades de crecimiento profesional</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🥐</div>
              <h3>Productos Top</h3>
              <p>Trabaja con los mejores churros y chocolate de Canarias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="opportunities-section">
        <div className="container">
          <h2>Oportunidades Actuales</h2>
          <div className="opportunities-message">
            <div className="message-icon">🎯</div>
            <h3>En este momento no tenemos vacantes disponibles</h3>
            <p>Pero nos encantaría conocerte. Envía tu CV y lo tendremos en cuenta para futuras oportunidades.</p>
            <div className="benefits-highlight">
              <h4>Lo que ofrecemos:</h4>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-check">✅</span>
                  <span>Contrato estable y buen ambiente laboral</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-check">✅</span>
                  <span>Formación continua en churrería artesanal</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-check">✅</span>
                  <span>Horarios flexibles adaptados a ti</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-check">✅</span>
                  <span>Oportunidades de crecimiento profesional</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-check">✅</span>
                  <span>Trabaja con los mejores productos de Canarias</span>
                </div>
              </div>
            </div>
            <p className="cta-text">¡Déjanos tu CV y te contactaremos cuando tengamos nuevas vacantes!</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="form-section">
        <div className="container">
          <h2>Envía tu Candidatura</h2>
          <p className="form-description">
            Completa el formulario y adjunta tu CV. Nos pondremos en contacto contigo pronto.
          </p>

          {submitStatus === 'success' && (
            <div className="success-message">
              ✅ ¡Gracias por tu candidatura! Te contactaremos pronto.
            </div>
          )}

          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-grid">
              {/* Nombre */}
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  placeholder="+34 600 000 000"
                  pattern="[0-9]{9}"
                />
              </div>

              {/* Puesto */}
              <div className="form-group">
                <label htmlFor="puesto">Puesto de Interés *</label>
                <select
                  id="puesto"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un puesto...</option>
                  <option value="cocina">Ayudante de Cocina</option>
                  <option value="atencion">Atención al Cliente</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Experiencia */}
              <div className="form-group full-width">
                <label htmlFor="experiencia">Experiencia Previa *</label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona tu experiencia...</option>
                  <option value="sin-experiencia">Sin experiencia</option>
                  <option value="poca-experiencia">Poca experiencia (menos de 1 año)</option>
                  <option value="experiencia">Experiencia (1-3 años)</option>
                  <option value="mucha-experiencia">Mucha experiencia (más de 3 años)</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="form-group full-width">
                <label htmlFor="mensaje">Mensaje (Opcional)</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Cuéntanos sobre ti, tu disponibilidad y por qué quieres trabajar con nosotros..."
                />
              </div>

              {/* CV Upload */}
              <div className="form-group full-width">
                <label htmlFor="cv">Adjunta tu CV *</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="file-input"
                  />
                  <div className="file-upload-info">
                    <span className="file-icon">📄</span>
                    <div className="file-details">
                      <span className="file-types">PDF, JPG o PNG (máx. 5MB)</span>
                      {cvFile && (
                        <span className="file-name">✅ {cvFile.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Enviando...' : '📤 Enviar Candidatura'}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <h2>¿Tienes dudas?</h2>
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <span className="contact-icon">📍</span>
              <h3>Visítanos</h3>
              <p>Ctra. Gral. del Norte 112, Las Palmas</p>
              <p>Centro Comercial La Ballena, Local T24</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-icon">📞</span>
              <h3>Llámanos</h3>
              <p>+34 928 420 330</p>
              <p>Lunes a Domingo: 9:00 - 22:30</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-icon">✉️</span>
              <h3>Escríbenos</h3>
              <p>gerencia@gemelosgarcia.com</p>
              <p>Recursos Humanos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trabajanos;