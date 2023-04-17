import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from '../StateProvider';
//import { FaStar } from 'react-icons/fa';


function CheckoutProduct({ id, image, name, price, rating }) {

  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id
    })
  }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image} alt=''/>
        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{name}</p>
            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct__rating'>
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>⭐️</p>
                    ))}
            </div>
            <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct