import React, { useState, useEffect } from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => {
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/textdata')
      .then((response) => response.json())
      .then((data) => setTextData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="app__header app__wrapper section_padding" id="home">
      <div className="app__wrapper_info">
        <h1 className='app__header-h1'>{textData && textData.Title}</h1>
        <SubHeading title={textData && textData.Subtitle}/>
        <p className="p__opensans" style={{margin: '2rem 0'}}>{textData && textData.Description}</p>
        <a href="#intro">
          <button type="button" className="custom__button">Watch Trailer</button>
        </a>
      </div>

      <div className='app__wrapper_img'>
        <img src={images.welcome} alt="header img"/>
      </div>
    </div>
  );
};

export default Header;