import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section_padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="The Concept of Loneliness"/>
      <h1 className='app__header-h1'>Paranoia</h1>
      <p className="p__opensans" style={{margin: '2rem 0'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque felis enim, faucibus sit amet sodales eu, egestas et eros. Etiam congue maximus massa ut luctus. Cras et dapibus ipsum. Maecenas vitae lacus sed velit accumsan tempus sed a tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nulla lacus, molestie id sagittis vitae.</p>
      <a href="#intro">
        <button type="button" className="custom__button">Explorer</button>
      </a>
    </div>

    <div className='app__wrapper_img'>
      <img src={images.welcome} alt="header img"/>
    </div>
  </div>
);

export default Header;
