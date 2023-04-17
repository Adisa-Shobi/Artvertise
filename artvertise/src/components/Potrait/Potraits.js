import './PotraitStyles.css';
import PotraitData from './PotraitData';

import React from 'react'

function Potraits() {
  return (
    <>
    <div className='potrait'>
        <h1>Recent Potraits</h1>
        <p>You can discover unique potraits using Artvertise</p>
        <div className='potraitcard'>
            <PotraitData 
                image='https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                heading="Flowers in a Metal Vase."
                text="Flowers in a metal vase create a unique and charming aesthetic that can brighten up any space. Metal vases offer a modern and industrial look, making them a popular choice for contemporary interior design.
                When it comes to flower arrangements, metal vases can add a touch of elegance and sophistication. They are often used for minimalist designs, which make the flowers stand out and become the focal point.
                "
            />

            <PotraitData 
                image='https://images.unsplash.com/photo-1576769267221-a9b2a5d93ebc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                heading="The Blind Girl, 1856. Artist: John Everett Millais"
                text="The Blind Girl is a painting by British artist John Everett Millais, completed in 1856. It depicts a young blind girl sitting on the side of a road with an older girl, who appears to be her sister, begging for alms. The painting is considered one of Millais' most famous works and is known for its detailed and realistic representation of nature.
                "
            />

            <PotraitData 
                image='https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                heading="Michael Angelo's painting."
                text="Michelangelo Buonarroti was a renowned Italian artist of the Renaissance period, known for his exceptional skills as a painter, sculptor, and architect. He is widely considered one of the greatest artists of all time, and his works continue to inspire and influence artists today.  
                "
            />
        </div>
    </div>
    <div className='potrait'>
        <h1>Most Trending Potraits</h1>
        <p>These are the most purchased potraits</p>
        <div className='potraitcard'>
            <PotraitData 
                image='https://images.pexels.com/photos/2236382/pexels-photo-2236382.jpeg?auto=compress&cs=tinysrgb&w=600'
                heading="People Graphic House"
                text="Flowers in a metal vase create a unique and charming aesthetic that can brighten up any space. Metal vases offer a modern and industrial look, making them a popular choice for contemporary interior design.
                When it comes to flower arrangements, metal vases can add a touch of elegance and sophistication. They are often used for minimalist designs, which make the flowers stand out and become the focal point.
                "
            />

            <PotraitData 
                image='https://images.pexels.com/photos/959314/pexels-photo-959314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                heading="White and Black Floral With Face-printed Door"
                text="The Blind Girl is a painting by British artist John Everett Millais, completed in 1856. It depicts a young blind girl sitting on the side of a road with an older girl, who appears to be her sister, begging for alms. The painting is considered one of Millais' most famous works and is known for its detailed and realistic representation of nature.
                "
            />

            <PotraitData 
                image='https://images.pexels.com/photos/2086987/pexels-photo-2086987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                heading="Woman in Brown Floral Sari Dress "
                text="Michelangelo Buonarroti was a renowned Italian artist of the Renaissance period, known for his exceptional skills as a painter, sculptor, and architect. He is widely considered one of the greatest artists of all time, and his works continue to inspire and influence artists today.  
                "
            />
            
        </div>
    </div>
    </>
  )
}

export default Potraits