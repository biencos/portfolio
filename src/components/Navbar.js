import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div data-role='Header' className='navbar-container'>
      <div className='navbar'>
        <img
          alt='Portfolio logo'
          src='/logo_light.svg'
          className='navbar-logo'
        />

        <button
          className='hamburger'
          onClick={toggleMenu}
          aria-label='Toggle navigation menu'
          aria-expanded={isMenuOpen}
        >
          <svg
            className={`hamburger-icon ${isMenuOpen ? 'active' : ''}`}
            viewBox='0 0 100 100'
            width='48'
          >
            <path
              className='line top'
              d='m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20'
            />
            <path className='line middle' d='m 30,50 h 40' />
            <path
              className='line bottom'
              d='m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20'
            />
          </svg>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <a href='#home' className='navbar-link' onClick={closeMenu}>
            Home
          </a>
          <a href='#services' className='navbar-link' onClick={closeMenu}>
            Services
          </a>
          <a href='#experience' className='navbar-link' onClick={closeMenu}>
            Experience
          </a>
          <a href='#contact' className='navbar-link' onClick={closeMenu}>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
