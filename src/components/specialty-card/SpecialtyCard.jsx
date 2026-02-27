import React from 'react';
import './SpecialtyCard.css';

const SpecialtyCard = ({ title, description, icon }) => {
    return (
        <div className="product-card">
            <div className="card-image">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default SpecialtyCard;
