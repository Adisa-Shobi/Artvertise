import Artists from '../components/Artists/Artists';
import contents from '../components/Artists/ArtistsData';
import '../components/Artists/ArtistsStyles.css'

import React from 'react'

function ArtistsPage() {
  return (
    <>
    <div className='artistsPage'>
        {contents.map(contents => (
                    <Artists 
                        key={contents.id}
                        image={contents.image}
                        name={contents.name}
                        totalSales={contents.totalSales}
                        rating={contents.rating}
                    />
                ))}
    </div>
    </>
  )
}

export default ArtistsPage