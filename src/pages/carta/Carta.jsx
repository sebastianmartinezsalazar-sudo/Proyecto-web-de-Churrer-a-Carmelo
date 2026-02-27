import React from 'react';
import { menuData } from '../../data/menuData';
import './Carta.css';

const Carta = () => {
    return (
        <div className="carta-page">
            <div className="carta-header">
                <h1>Nuestra Carta</h1>
                <p>Descubre los sabores de Churrería Carmelo</p>
            </div>

            <div className="container carta-container">
                {menuData.map((section, index) => (
                    <div key={index} className="menu-section">
                        <h2 className="menu-category-title">{section.category}</h2>
                        <div className="menu-grid">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="menu-item">
                                    <div className="menu-item-content">
                                        <h3 className="menu-item-name">{item.name}</h3>
                                        <p className="menu-item-desc">{item.description}</p>
                                    </div>
                                    <div className="menu-item-price">
                                        {/* Prices not available in source, could add later */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="carta-footer-note">
                <p>* Los precios y disponibilidad pueden variar. Consulta en el local.</p>
            </div>
        </div>
    );
};

export default Carta;
