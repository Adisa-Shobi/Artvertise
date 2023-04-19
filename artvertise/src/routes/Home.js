import React from 'react';
import Hero from '../components/Hero/Hero';
import Work from '../components/Work/Work';
import Potraits from '../components/Potrait/Potraits';
import Footer from '../components/Footer/Footer';
// import ImageSlider from '../components/ImageSlider';
import Testimonials from '../components/Testimonials/Testimonials';
// import Main from '../components/Main';
//import Main from '../components/Main'
//import Navbar from '../components/Navbar';

function Home() {

  return (
    <>
        <Hero 
          cName="hero"
          heroImg="https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          title="Transform your walls into a canvas of beauty"
          text="Discover your masterpiece today - Art buying made easy!"
          buttonText="Purchase Art"
          url='/login'
          btnClass="show"
        />
        {/* <Main /> */}
        <Potraits />
        <Work />
        <Testimonials />
        <Footer />
    </>
  )
}

export default Home