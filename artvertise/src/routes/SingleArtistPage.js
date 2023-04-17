import React from 'react'
import SingleArtistArt from '../components/SingleArtist/SingleArtistArt'
//import contents from '../components/Artists/ArtistsData';
import data from '../components/SingleArtist/Data';

function SingleArtistPage() {
  return (
    <>
    <div className='artistsPage'>
        {data.map(data => (
                    <SingleArtistArt
                        key={data.id}
                        image={data.image}
                        name={data.name}
                        about={data.about}
                        price={data.price}
                        rating={data.rating}
                    />
                ))}
    </div>
    </>
  )
}

export default SingleArtistPage