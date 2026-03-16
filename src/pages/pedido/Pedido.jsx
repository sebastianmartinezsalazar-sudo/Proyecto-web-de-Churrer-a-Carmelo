import { useState, useEffect } from 'react';
import './Pedido.css';

const Pedido = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const deliveryPlatforms = [
    {
      id: 'uber',
      name: 'Uber Eats',
      color: '#06C167',
      icon: '🚗',
      description: 'Entrega rápida y seguimiento en tiempo real',
      url: 'https://www.ubereats.com',
      deliveryTime: '30-45 min',
      deliveryFee: '€2.99'
    },
    {
      id: 'glovo',
      name: 'Glovo',
      color: '#FFCC00',
      icon: '🏍️',
      description: 'Entrega express con mensajería local',
      url: 'https://glovoapp.com',
      deliveryTime: '25-40 min',
      deliveryFee: '€1.99'
    }
  ];

  const handleOrderClick = (platform) => {
    setSelectedPlatform(platform);
    setTimeout(() => {
      window.open(platform.url, '_blank', 'noopener,noreferrer');
    }, 1500);
  };

  return (
    <div className="pedido-page">
      <div className="pedido-container">
        <h1>🛒 Haz tu Pedido</h1>
        <p className="pedido-subtitle">
          Elige tu plataforma de delivery preferida y disfruta de nuestros churros en casa
        </p>

        <div className="platforms-grid">
          {deliveryPlatforms.map((platform) => (
            <div 
              key={platform.id} 
              className={`platform-card ${selectedPlatform?.id === platform.id ? 'selected' : ''}`}
              style={{borderColor: platform.color}}
            >
              <div className="platform-icon" style={{fontSize: '4rem'}}>
                {platform.icon}
              </div>
              
              <h2 style={{color: platform.color}}>{platform.name}</h2>
              
              <p className="platform-description">{platform.description}</p>
              
              <div className="platform-details">
                <div className="detail">
                  <span className="detail-icon">⏱️</span>
                  <span>{platform.deliveryTime}</span>
                </div>
                <div className="detail">
                  <span className="detail-icon">💶</span>
                  <span>Envío: {platform.deliveryFee}</span>
                </div>
              </div>

              <button 
                className="order-button"
                style={{backgroundColor: platform.color}}
                onClick={() => handleOrderClick(platform)}
              >
                {selectedPlatform?.id === platform.id ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Redirigiendo...
                  </>
                ) : (
                  <>
                    Pedir por {platform.name}
                    <span className="arrow">→</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="pedido-info">
          <h3>📋 ¿Cómo hacer tu pedido?</h3>
          <ol>
            <li>Elige tu plataforma de delivery preferida</li>
            <li>Serás redirigido a la app o web de delivery</li>
            <li>Selecciona tus churros favoritos</li>
            <li>¡Disfruta en casa!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Pedido;