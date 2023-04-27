import './PotraitStyles.css';

import React from 'react'

function PotraitData(props) {
  return (
    <div className='p-card'>
        <div className='p-image'>
            <img className='potrait-image'src={props.image} alt="artimage"/>
        </div>
        <h4>{props.heading}</h4>
        <p>{props.text}</p>
    </div>
  )
}

export default PotraitData;