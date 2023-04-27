import React from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import './NavbarBStyles.css'
import StorageService from '../../utils/storage.utils';

function NavbarB() {

  const user = StorageService.getUser();
    console.log('USER>>>', user);
  // basket => state of global store , dispatch
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();
  return (
    <>
        <nav className='Checkout-NavbarItems'>
            <Link to = "/artists" className='nav-link'>
                <h1 className="artists-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
            </Link>

            
            <div className='navbar-option'>
                <Link to={!user?.firstName ? '/login' : '/artists'} className='nav-link'>
                  <span className='header-option-one'>Hello {!user.firstName ? 'Guest' : user.firstName }</span>
                </Link>
                <Link to={!user?.firstName ? '/login' : '/userprofile'} className='nav-link'>
                  <i className='fa-solid fa-user-circle'></i>
                </Link>
                <Link to={!user?.firstName ? '/login' : '/checkout'} className='nav-link'>
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span className='counter'>{basket?.length}</span>
                </Link>
            </div>
            
        </nav>
    </>
  )
}

export default NavbarB