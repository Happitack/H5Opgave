import React, { useState, useEffect } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Paranoia.css';

const Paranoia = () => {
  const [textData, setTextData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/textdata/paranoia')
      .then(response => response.json())
      .then(data => setTextData(data))
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div className="app__bg_anim app__paranoia app__wrapper" id="paranoia">
      {textData.map((data, index) => (
        <div key={index} className='app__wrapper_paranoia_bg'>
          <div className="app__paranoia_wrapper_info">
            <h1 className='app__paranoia-h1'>{data.Title}</h1>
            <SubHeading title={data.Subtitle} />
            <p className="p__opensans" style={{margin: '2rem 0'}}>{data.Description}</p>
            <a href="#trailer">
              <button type="button" className="custom__button">Watch Trailer</button>
            </a>
          </div>

          <div className='app__paranoia_wrapper_img'>
            <img src={images.paranoia} alt="header img" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Paranoia;