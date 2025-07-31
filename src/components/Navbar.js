import './Navbar.css';

const Navbar = () => (
  <div data-role="Header" className="navbar-container">
    <div className="navbar">
      <img alt="Portfolio logo" src="/logo_dark.svg" className="navbar-logo" />
      <div className="navbar-links">
        <a href="#home" className="navbar-link">Home</a>
        <a href="#services" className="navbar-link">Services</a>
        <a href="#experience" className="navbar-link">Experience</a>
        <a href="#contact" className="navbar-link">Contact</a>
      </div>
    </div>
  </div>
);

export default Navbar;
