import './Footer.css';

const Footer = () => {
    // Get current year dynamically for copyright
    const currentYear = new Date().getFullYear();

    return (
        <footer className="main-footer">
            <div className="footer-container">
                {/* Column 1: Brand info and social media */}
                <div className="footer-column brand-col">
                    <h3>Churrería Carmelo</h3>
                    <p>Passion for artisanal churros since 1985.</p>
                    <div className="social-icons">
                        {/* Instagram link with SVG icon */}
                        <a
                            href="https://www.instagram.com/churreria_carmelo/"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                            </svg>
                        </a>
                        {/* GitHub project link */}
                        <a
                            href="https://github.com/sebastianmartinezsalazar-sudo/Proyecto-web-de-Churrer-a-Carmelo"
                            aria-label="Project GitHub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick links navigation */}
                <div className="footer-column links-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/carta">Menu</a></li>
                        <li><a href="/contacto">Contact</a></li>
                        <li><a href="https://github.com/sebastianmartinezsalazar-sudo/Proyecto-web-de-Churrer-a-Carmelo" target="_blank" rel="noopener noreferrer">Project GitHub</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact information */}
                <div className="footer-column contact-col">
                    <h4>Contact</h4>
                    <p>📍 Ctra. Gral. del Norte 112, Las Palmas</p>
                    <p>📞 +34 928 420 330</p>
                    <p>✉️ gerencia@gemelosgarcia.com</p>
                </div>

                {/* 🚚 Column 4: Delivery Platforms (DENTRO del container) */}
                <div className="footer-column delivery-col">
                    <h4>🚚 Delivery</h4>
                    <p>Order from home</p>
                    <div className="delivery-platforms">
                        <a
                            href="https://www.ubereats.com/es/store/churreria-carmelo-carretera-general-del-norte-112/j217nh4NSZCBEg-l1lrjnQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="delivery-link uber-eats"
                            aria-label="Order on Uber Eats"
                        >
                            <span className="delivery-icon">🟢</span>
                            <span className="delivery-name">Uber Eats</span>
                        </a>
                        <a
                            href="https://glovoapp.com/es/es/las-palmas-de-gran-canaria/stores/churreria-carmelo-las-palmas-de-gran-canaria"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="delivery-link glovo"
                            aria-label="Order on Glovo"
                        >
                            <span className="delivery-icon">🟡</span>
                            <span className="delivery-name">Glovo</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer bottom bar with copyright and legal links */}
            <div className="footer-bottom">
                <p>
                    &copy; {currentYear} Churrería Carmelo | Churrería GEMELOS GARCIA S.L. All rights reserved.
                </p>
                <div className="footer-legal">
                    <a href="#privacy">Privacy Policy & Cookies</a>
                    <span className="separator">|</span>
                    <a href="#terms">Terms of Sale</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;