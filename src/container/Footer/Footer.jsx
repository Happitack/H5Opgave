import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { TfiLineDotted } from 'react-icons/tfi';

import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="login">
    <FooterOverlay />
    <Newsletter />

    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Get in touch</h1>
        <p className="p__opensans">Contact information:</p>
      </div>

      <div className="app__footer-links_logo">
        <img src={images.gericht} alt="footer_logo" />
        <p className="p__opensans">&quot;Just give us a budget&quot;</p>
        <TfiLineDotted id="footer__icon-pencil" size="2em"/>
        <div className="app__footer-links_icons">
          <a href='https://www.facebook.com' target="_blank"><FiFacebook /></a>
          <a href='https://www.twitter.com' target="_blank"><FiTwitter /></a>
          <a href='https://www.instagram.com' target="_blank"><FiInstagram /></a> 
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Working Hours</h1>
        <p className="p__opensans">Monday-Friday:</p>
        <p className="p__opensans">09:00 am - 19:00 pm</p>
        <p className="p__opensans">Saturday-Sunday:</p>
        <p className="p__opensans">12:00 am - 15:00 pm</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">©2023 Twin Minds. All Rights reserved.</p>
    </div>

  </div>
);

export default Footer;
