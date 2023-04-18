import React from 'react';
import './ArtistsStyles.css';
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function Artists({ id, image, name, totalSales, rating, url }) {
//   const artType='artpotraits'

  return (
    <div>
        <nav className='Artists-NavbarItems'>
            <Link to='/' className='nav-link'>
            <h1 className="artists-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
            </Link>
            <h5>Hi Guest</h5>
        </nav>
        <div className='artistsList'>
            <div key={id} className='artistsCard'>
                <img src={image} alt='artists-img' className='artistsImage'></img>

                <div className='artistsCard__content'>
                    <h3 className='artistsName'>{name}</h3>
                    <div className='displayStack__1'>
                        <div className='artistsSales'><span className='unitsSold'>{totalSales}</span> units sold</div>
                    </div>
                    <div className='displayStack__2'>
                        <div className='artistsRating'>
                            {[...Array(rating)].map((index) => (
                                <FaStar id={index + 1 } key={index} />
                            ))}
                        </div>
                    </div>
                    <Link to={`/${name}`}>
                        <button className='viewArt-button'>View Art</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Artists