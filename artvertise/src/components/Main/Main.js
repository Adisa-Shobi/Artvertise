import React from 'react';
import video from '../videos/video.mp4';
//import image from '../images/image-0.jpeg'
import './MainStyles.css';

function Main() {
  return (
    <div className='main'>
        <div className='overlay'></div>
        <video src={video} autoPlay loop muted />
        {/* <img src={image} alt='artImage' /> */}
        <div className='content'>
            <h1 className='main-title'>Transform your walls into a canvas of beauty</h1>
            <p>Discover your masterpiece today - Art buying made easy!</p>
            <button className='main-button'>Purchase Art</button>
        </div>

    </div>
  )
}

export default Main