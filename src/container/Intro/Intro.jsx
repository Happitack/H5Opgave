import React, { useState, useRef } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { meal } from '../../constants';
import './Intro.css';

const Intro = () => {
  const [isPlaying, setIsPlaying] = useState(true); 
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying); 
  };

  return (
    <div className="app__video">
      <video
        ref={videoRef}
        src={meal}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        onClick={togglePlayPause}
      />

      <div className="app__video-overlay flex__center" onClick={togglePlayPause}>
        {!isPlaying && (
          <div className="app__video-overlay_circle flex__center">
            <BsFillPlayFill color="#fff" fontSize={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;