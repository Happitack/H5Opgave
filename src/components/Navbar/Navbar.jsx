import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import images from '../../constants/images';
import './Navbar.css';

const Navbar = () => {
  // State variable for checking if the page has been scrolled down
  const [isScrolled, setIsScrolled] = React.useState(false);

  // State variable for toggling the navigation menu on small screens
  const [toggleMenu, setToggleMenu] = React.useState(false);

  React.useEffect(() => {

    // Function to handle scrolling. Sets isScrolled state based on whether the page has been scrolled down
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show !== isScrolled) setIsScrolled(show);
    };

    document.addEventListener('scroll', handleScroll); // Adds an event listener to handle scrolling

    return () => {
      document.removeEventListener('scroll', handleScroll); // Removes the event listener when the component unmounts
    };
  }, [isScrolled]); // Is run when isScrolled changes

  return (
    <nav className={`app__navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="app__navbar-logo">
      <a href="#home"><img src={images.gericht} alt="app__logo" /></a>
      </div>

      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu className="app__navbar-smallscreen__icon"  color="#fff" fontSize={30} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <AiOutlineClose className="app__navbar-smallscreen__icon overlay__close" color="#fff" fontSize={27} onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><a href="#about" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Paranoia</a></li>
              <li><a href="#intro" onClick={() => setToggleMenu(false)}>Trailer</a></li>
              <li><a href="#newsletter" onClick={() => setToggleMenu(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;