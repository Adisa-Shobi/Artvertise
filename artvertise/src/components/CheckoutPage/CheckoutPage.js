import React from 'react';
import './CheckoutPageStyles.css';
//import { Link } from 'react-router-dom';
import banner from '../../images/Artvertise.png'
import Subtotal from '../Subtotal';
import { useStateValue } from '../StateProvider';
import NavbarB from '../NavbarBasket/NavbarB';
import CheckoutProduct from '../CheckoutProducts/CheckoutProduct';



function CheckoutPage() {
  // eslint-disable-next-line
  const [{basket}, dispatch] = useStateValue();
  return (
    <>
      {/* <nav className='Checkout-NavbarItems'>
        <Link to = "/" className='nav-link'>
            <h1 className="checkout-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
        </Link>

        <Link to='/checkout' className='nav-link'>
        <div className='navbar-option'>
            <i className="fa-solid fa-bag-shopping"></i>
            <span className='counter'>{basket?.length}</span>
        </div>
        </Link>
      </nav> */}
      <NavbarB />
      <div className='checkout'>
          <div className='checkout__left'>
            <img 
            className='checkout__ad' 
            src={banner}
            alt=''/>
            <div>
              <h2 className='checkout__title'>
                Your Shopping Basket
              </h2>
              {
                    basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))
                }
            </div>
          </div>
          <div className='checkout__right'>
            <Subtotal />
          </div>
      </div>
    </>
  )
}


export default CheckoutPage