import React from 'react'
import './WorkStyles.css'
import image1 from '../../images/image-0.jpeg'
import image2 from '../../images/image-1.jpeg'
import image3 from '../../images/image-4.jpeg'
import image4 from '../../images/image-6.jpeg'
import WorkData from './WorkData'

function Work() {
  return (
    <div className='work'>
        <h1>Artwork on Display</h1>
        <p>Feast your eyes on a visual symphony</p>
        <WorkData 
            className="first-des"
            heading="Our stunning collection of artwork on display will transport you to another world"
            text="When you step into our exhibition hall, get ready to embark on a sensory journey like no other. Our artwork on display is carefully curated to provide you with an immersive experience that will leave you mesmerized. Each piece of art is a unique expression of the artist's vision, skill, and creativity. From vibrant abstract paintings to thought-provoking sculptures, our collection showcases a range of styles and mediums that will leave you in awe. As you wander through the gallery, you'll feel transported to another world, where beauty and imagination reign supreme. So come and feast your eyes on this visual symphony - a celebration of the power of art to inspire, captivate, and delight."
            img1={image1}
            img2={image2}
        />

        <WorkData 
            className="first-des-reverse"
            heading="The artwork displayed in our collection by various artists."
            text="The artwork displayed in our collection by various artists offers a diverse range of styles, techniques, and mediums. Each piece showcases the unique creativity and expression of the individual artist, and collectively they create an impressive and captivating exhibition. From realistic oil paintings to abstract mixed-media sculptures, the collection offers something for every art lover. Each artwork has been carefully curated and arranged to create a cohesive and harmonious display, allowing visitors to immerse themselves in the beauty and emotion conveyed through the visual language of art."
            img1={image3}
            img2={image4}
        />
    </div>
  )
}

export default Work