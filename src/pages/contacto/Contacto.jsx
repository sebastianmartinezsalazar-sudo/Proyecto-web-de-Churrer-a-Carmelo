import React from 'react';
import './Contacto.css';
import MapComponent from '../../components/map/MapComponent';

const Contacto = () => {
    return (
        <div className="contacto-page">
            <div className="contacto-header">
                <h1>Contacta con Nosotros</h1>
                <p>Estamos aquí para atenderte</p>
            </div>

            <div className="container contacto-container">
                <div className="contacto-content">
                    <div className="contacto-info">
                        <h2>Información de Contacto</h2>
                        <div className="info-item">
                            <h3>📍 Dirección</h3>
                            <p>Carretera General del Norte 112</p>
                            <p>35013 Las Palmas de Gran Canaria, España</p>
                        </div>
                        <div className="info-item">
                            <h3>📞 Teléfono</h3>
                            <p><a href="tel:+34928420330">+34 928 420 330</a></p>
                        </div>
                        <div className="info-item">
                            <h3>✉️ Email</h3>
                            <p>gerencia@gemelosgarcia.com</p>
                            <p><a href="https://www.instagram.com/churreria_carmelo/" target="_blank" rel="noopener noreferrer">Instagram: @churreria_carmelo</a></p>
                        </div>
                        <div className="info-item">
                            <h3>⏰ Horario</h3>
                            <p>Lunes a Domingo: 09:00 - 22:00</p>
                        </div>
                    </div>

                    <div className="contacto-form-wrapper">
                        <h2>Envíanos un Mensaje</h2>
                        <form className="contacto-form">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="tu@email.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mensaje">Mensaje</label>
                                <textarea id="mensaje" name="mensaje" rows="5" placeholder="¿En qué podemos ayudarte?" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
                        </form>
                    </div>
                </div>

                <div className="contacto-map-section">
                    <h2>Nuestra Ubicación</h2>
                    <div className="map-wrapper">
                        <MapComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
