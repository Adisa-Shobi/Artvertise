import React from 'react'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
import AboutUs from '../components/AboutUs/AboutUs'
//import image from '../images/image-0.jpeg'

function About() {
  return (
    <>
        <Hero 
          cName="hero-mid"
          heroImg='https://images.unsplash.com/photo-1606291623245-238bf2020b5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
          title="About Us"
          // text="For an easy and enjoyable buying experience."
          // buttonText="Purchase Art"
          url='/'
          btnClass="hide"
        />
        <AboutUs />
        <Footer />
    </>
  )
}

export default About