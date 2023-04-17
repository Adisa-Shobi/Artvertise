import React from 'react'
import './PaymentCompStyles.css'
import NavbarB from '../NavbarBasket/NavbarB'
import CheckoutProduct from '../CheckoutProducts/CheckoutProduct'
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

function PaymentComp() {
  // eslint-disable-next-line
  const [{basket}, dispatch] = useStateValue();
  return (
    <div className='payment'>
        <NavbarB />
        <div className='payment__container'>
            <h1 className='payment-header'>
                Checkout (<Link to="/checkout">{basket?.length} items </Link>)
            </h1>
            {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    {/* <p>{user?.email}</p> */}
                    <p>Mbagathi Road - Langata</p>
                    <p>Nairobi, Kenya</p>
                </div>
            </div>
        </div>
        {/* Payment section - Review Items */}
        <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct 
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
        </div>

        {/* Payment section - Payment method */}
        <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
        </div>
    </div>
  )
}

export default PaymentComp