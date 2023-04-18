import React from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import './NavbarBStyles.css'

function NavbarB() {
  // basket => state of global store , dispatch
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();
  return (
    <>
        <nav className='Checkout-NavbarItems'>
            <Link to = "/artists" className='nav-link'>
                <h1 className="artists-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
            </Link>

            <Link to='/checkout' className='nav-link'>
            <div className='navbar-option'>
                <i className="fa-solid fa-bag-shopping"></i>
                <span className='counter'>{basket?.length}</span>
            </div>
            </Link>
        </nav>
    </>
  )
}

export default NavbarB