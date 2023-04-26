import React from 'react'
import './HeroStyles.css'
//import image from '../images/image-0.jpeg'

function Hero(props) {
  return (
    <>
        <div className={props.cName}>
            <img className='hero-image' src={props.heroImg} alt='heroimage' />
            <div className='hero-text'>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <a href={props.url} className={props.btnClass}>{props.buttonText}</a>
            </div>
        </div>
    </>
  )
}

export default Hero