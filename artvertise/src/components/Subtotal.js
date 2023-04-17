import React from 'react'
import './Subtotal.css'
import { useStateValue } from './StateProvider'
import Currency from 'currency.js'
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {

  const history = useHistory();
  // eslint-disable-next-line
  const [{ basket }, dispatch] =useStateValue();
  return (
    <div className='subtotal'>
      <p>
        Subtotal ({basket.length}) items:
        <strong>
          {Currency(getBasketTotal(basket), { symbol: ' $ ', precision: 2 }).format()}
        </strong>
      </p>
      <small className='subtotal__gift'>
        <input type='checkbox' /> This order contains a gift
      </small>
      {/* <button onClick={e => history.push('/payment')}>Proceed to Checkout</button> */}
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal