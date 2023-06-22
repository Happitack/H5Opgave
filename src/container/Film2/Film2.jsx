import React, { useState, useEffect } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Film2.css';

const Film2 = () => {
  const [textData, setTextData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/textdata/projectfear')
      .then(response => response.json())
      .then(data => setTextData(data))
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div className="app__bg_anim app__film2 app__wrapper" id="projectfear">
      {textData.map((data, index) => (
        <div key={index} className='app__wrapper_film2_bg'>
          <div className='app__film2_wrapper_img'>
            <img src={images.projectfear} alt="header img" />
          </div>
          <div className="app__film2_wrapper_info">  {/* changed class here */}
            <h1 className='app__film2-h1'>{data.Title}</h1>
            <SubHeading title={data.Subtitle} />
            <p className="p__opensans_films" style={{margin: '2rem 0'}}>{data.Description}</p>
            <button type="button" className="custom__button">Coming Soon</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Film2;
