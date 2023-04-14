import React from 'react'
import './SingleArtistStyles.css'
import { FaStar } from 'react-icons/fa'

function SingleArtistArt(props) {
  return (
    <div>
        <nav className='Artists-NavbarItems'>
            <h1 className="artists-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
            <h5>Hi Guest</h5>
        </nav>
        <div className='artistsList'>
            <div key={props.id} className='artistsCard'>
                <img src={props.image} alt='artists-img' className='artistsImage'></img>

                <div className='artistsCard__content'>
                    <h3 className='artistsName'>{props.name}</h3>
                    <div className='displayStack__1'>
                        <div className='artistsSales'><span className='unitsSold'>{props.totalSales}</span> units sold</div>
                    </div>
                    <div className='displayStack__2'>
                        <div className='artistsRating'>
                            {[...Array(props.rating)].map((index) => (
                                <FaStar id={index + 1 } key={index} />
                            ))}
                        </div>
                    </div>
                    <button className='viewArt-button'><a href='/artpotraits' className='viewArt-link'>View Art</a></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleArtistArt