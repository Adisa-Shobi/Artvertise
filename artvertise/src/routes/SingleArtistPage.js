import React from 'react'
import SingleArtistArt from '../components/SingleArtist/SingleArtistArt'
//import contents from '../components/Artists/ArtistsData';
import data from '../components/SingleArtist/Data';
import data2 from '../components/SingleArtistsData/Steve'
import data3 from '../components/SingleArtistsData/Dids'
import data4 from '../components/SingleArtistsData/Gulsik'
import data5 from '../components/SingleArtistsData/Matheus'
import data6 from '../components/SingleArtistsData/Martin'

function SingleArtistPage() {
  return (
    <>
    <div className='artistsPage'>
        {data.map(data => (
                    <SingleArtistArt
                        id={data.id}
                        image={data.image}
                        name={data.name}
                        about={data.about}
                        price={data.price}
                        rating={data.rating}
                        url={data.url}
                    />
                ))}
    </div>
    </>
  )
}

export default SingleArtistPage

export function SingleArtistPageSteve() {
  return (
    <>
    <div className='artistsPage'>
        {data2.map(data2 => (
                    <SingleArtistArt
                        id={data2.id}
                        image={data2.image}
                        name={data2.name}
                        about={data2.about}
                        price={data2.price}
                        rating={data2.rating}
                        url={data2.url}
                    />
                ))}
    </div>
    </>
  )
}

export function SingleArtistPageDids() {
  return (
    <>
    <div className='artistsPage'>
        {data3.map(data3 => (
                    <SingleArtistArt
                        id={data3.id}
                        image={data3.image}
                        name={data3.name}
                        about={data3.about}
                        price={data3.price}
                        rating={data3.rating}
                        url={data3.url}
                    />
                ))}
    </div>
    </>
  )
}

export function SingleArtistPageGulsik() {
  return (
    <>
    <div className='artistsPage'>
        {data4.map(data4 => (
                    <SingleArtistArt
                        id={data4.id}
                        image={data4.image}
                        name={data4.name}
                        about={data4.about}
                        price={data4.price}
                        rating={data4.rating}
                        url={data4.url}
                    />
                ))}
    </div>
    </>
  )
}

export function SingleArtistPageMatheus() {
  return (
    <>
    <div className='artistsPage'>
        {data5.map(data5 => (
                    <SingleArtistArt
                        id={data5.id}
                        image={data5.image}
                        name={data5.name}
                        about={data5.about}
                        price={data5.price}
                        rating={data5.rating}
                        url={data5.url}
                    />
                ))}
    </div>
    </>
  )
}

export function SingleArtistPageMartin() {
  return (
    <>
    <div className='artistsPage'>
        {data6.map(data6 => (
                    <SingleArtistArt
                        id={data6.id}
                        image={data6.image}
                        name={data6.name}
                        about={data6.about}
                        price={data6.price}
                        rating={data6.rating}
                        url={data6.url}
                    />
                ))}
    </div>
    </>
  )
}