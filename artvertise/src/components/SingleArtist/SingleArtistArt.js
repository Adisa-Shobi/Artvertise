import React from 'react'
import './SingleArtistStyles.css'
import { FaStar } from 'react-icons/fa';
//import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import NavbarB from '../NavbarBasket/NavbarB';

function SingleArtistArt(props) {
  // basket => state of global store , dispatch
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();
  console.log('This is the basket >>>>', basket);

  const addToBasket = () => {
    //Dispatch (like a gun=> shoots data to data layer) Item into the data layer
    dispatch({
        type: 'ADD_TO_BASKET',
        item: {
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            rating: props.rating
        }
    })

  }
  return (
    <div>
        {/* <nav className='Artists-NavbarItems'>
            <Link to = "/" className='nav-link'>
                <h1 className="artists-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
            </Link>

            <Link to='/checkout' className='nav-link'>
            <div className='navbar-option'>
                <i className="fa-solid fa-bag-shopping"></i>
                <span className='counter'>{basket?.length}</span>
            </div>
            </Link>
        </nav> */}
        <NavbarB />
        <div className='artistsList'>
            <div key={props.id} className='artistsCard'>
                <img src={props.image} alt='artists-img' className='artistsImage'></img>

                <div className='artistsCard__content'>
                    <h3 className='artistsName'>{props.name}</h3>
                    <div className='displayStack__1'>
                        <div className='artistsSales'>{props.about}</div>
                    </div>
                    <div className='art-price'>
                        <div>$ {props.price}</div>
                    </div>
                    <div className='displayStack__2'>
                        <div className='artistsRating'>
                            {[...Array(props.rating)].map((index) => (
                                <FaStar id={index + 1 } key={index} />
                            ))}
                        </div>
                    </div>
                    <button className='viewArt-button' onClick={addToBasket}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleArtistArt