import React from 'react'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
import Work from '../components/Work/Work'
import ImageSlider from '../components/Sliders/ImageSlider'

function Service() {
  const slides = [
    { url: 'https://images.pexels.com/photos/3586705/pexels-photo-3586705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    { url: 'https://images.pexels.com/photos/1781710/pexels-photo-1781710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { url: 'https://images.pexels.com/photos/1707640/pexels-photo-1707640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { url: 'https://images.pexels.com/photos/908713/pexels-photo-908713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { url: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { url: 'https://images.pexels.com/photos/3545961/pexels-photo-3545961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];

  const containerStyles = {
    width: "83%",
    height: "500px",
    margin: "5rem auto",
  };
  return (
    <>
        <Hero 
          cName="hero-mid"
          heroImg='https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          title="Surround yourself with art you'll love."
          // text="For an easy and enjoyable buying experience."
          buttonText="Explore Our Artworks"
          url='/'
          btnClass="show"
        />
        <Work />
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>
        <Footer />
    </>
  )
}

export default Service