import "./Footer.styles.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">

                <div className="footer-content">

                    <div className="footer-links">
                        <Link to="/aboutus">About Us</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="address">
                        <h1>Dự án BK Hotel</h1>
                        <h2>02 Võ Oanh, Phường 25, Bình Thạnh, Hồ Chí Minh</h2>
                        <h2>028 3899 2862</h2>
                    </div>
                    <div className="footer-social">

                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;