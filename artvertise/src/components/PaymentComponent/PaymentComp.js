import React from 'react'
import './PaymentCompStyles.css'
import NavbarB from '../NavbarBasket/NavbarB'
import CheckoutProduct from '../CheckoutProducts/CheckoutProduct'
import { useStateValue } from '../StateProvider';
import { Link, useHistory } from 'react-router-dom';
import StorageService from '../../utils/storage.utils';
import { getBasketTotal } from '../reducer';

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function PaymentComp() {
  // eslint-disable-next-line
  const [{basket}, dispatch] = useStateValue();
  const history = useHistory();

  const user = StorageService.getUser();
  console.log(user);

  const publishableKey = "pk_test_51MybTvKnRw0cJpMd1Rn07OI8LytvfrclFT10VIlOtGjOEeC1NDGsAnX0PQEzUp71XA4HV1314zbq9XTlwm6qIa6x007lkFlbIP";

  const handleSuccess = () => {
    MySwal.fire({
        icon: "success",
        title: "Payment was Sucessful",
        time: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
        icon: "failure",
        title: "Payment was not Sucessful",
        time: 4000,
    });
  };

  const payNow = async (token) => {
    try {
        const response = await axios({
            url: "http://localhost:5001/payment",
            method: "post",
            data: {
                amount: `${getBasketTotal(basket) * 100}`,
                token,
            },
        });
        if (response.status === 200) {
            handleSuccess();

            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/artists')
        }
    } catch (error) {
        handleFailure();
    }
  }

  


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
                    <p>{user?.email}</p>
                    <p>{user?.firstName} {user?.lastName}</p>
                    <p>{user?.country} : {user?.state} - {user?.city}</p>
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
                        hideButton
                        />
                    ))}
                </div>
        </div>

        {/* Payment section - Payment method */}
        <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                    <StripeCheckout
                        stripeKey={publishableKey}
                        label="Pay Now"
                        name="Pay With Credit Card"
                        amount={getBasketTotal(basket) * 100}
                        description={`Your total is $${getBasketTotal(basket)}`}
                        token={payNow}
                    />
                </div>
        </div>
    </div>
  )
}

export default PaymentComp