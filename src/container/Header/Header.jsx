import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section_padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="The Concepts of Loneliness"/>
      <h1 className='app__header-h1'>Paranoia</h1>
      <p className="p__opensans" style={{margin: '2rem 0'}}>In the aftermath of a social gathering, a young woman embarks on what should be a routine journey home. Yet, the comforting familiarity of her path is suddenly marred by an ominous sense of dread. Unseen eyes seem to linger in the shadows, turning every corner into a pulse-pounding question of safety. This tale of escalating paranoia blurs the line between the fearfully imagined and the dangerously real.</p>
      <a href="#intro">
        <button type="button" className="custom__button">Watch Trailer</button>
      </a>
    </div>

    <div className='app__wrapper_img'>
      <img src={images.welcome} alt="header img"/>
    </div>
  </div>
);

export default Header;
