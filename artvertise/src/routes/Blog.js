import React from 'react'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
//import Navbar from '../components/Navbar'

function Blog() {
  return (
    <>
         <Hero 
          cName="hero-mid"
          heroImg="https://images.unsplash.com/photo-1570710852509-d6d1f0da4704?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGFydCUyMGdhbGxlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          title="Transform your walls into a canvas of beauty"
          text="Discover your masterpiece today - Art buying made easy!"
          buttonText="Purchase Art"
          url='/'
          btnClass="show"
        />
        <Footer />
    </>
  )
}

export default Blog