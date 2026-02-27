import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-column brand-col">
                    <h3>Churrería Carmelo</h3>
                    <p>Pasión por los churros artesanales desde 1985.</p>
                    <div className="social-icons">
                        {/* Placeholders for icons */}
                        <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">FB</a>
                        <a href="https://www.instagram.com/churreria_carmelo/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a>
                    </div>
                </div>

                <div className="footer-column links-col">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/historia">Nuestra Historia</a></li>
                        <li><a href="/carta">Carta</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </div>

                <div className="footer-column contact-col">
                    <h4>Contacto</h4>
                    <p>📍 Ctra. Gral. del Norte 112, Las Palmas</p>
                    <p>📞 +34 928 420 330</p>
                    <p>✉️ gerencia@gemelosgarcia.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Churrería Carmelo | Churrería GEMELOS GARCIA S.L. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
