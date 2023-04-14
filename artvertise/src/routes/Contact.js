import React from 'react'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
import ContactForm from '../components/ContactForm/ContactForm'

function Contact() {
  return (
    <>
        <Hero 
          cName="hero-mid"
          heroImg='https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=600'
          title="Contact Us"
          text="For an easy and enjoyable buying experience."
          // buttonText="Contact Us"
          url='/'
          btnClass="hide"
        />
        <ContactForm />
        <Footer />
    </>
  )
}

export default Contact