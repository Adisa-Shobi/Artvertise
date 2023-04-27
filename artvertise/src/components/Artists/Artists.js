import React from 'react';
import './ArtistsStyles.css';
// import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom';
// import { useStateValue } from '../StateProvider';
import StorageService from '../../utils/storage.utils';
import AuthService from '../../Services/auth.service';
import { useStateValue } from '../StateProvider';

function Artists({ id, image, name, totalSales, rating }) {
//   const artType='artpotraits'
    // eslint-disable-next-line
    const [{ }, dispatch] = useStateValue();
    const user = StorageService.getUser();
    console.log('USER>>>', user);
    // console.log('USER>>>', user.email);
    // console.log("Basket>>>", basket)

    const handleAuthentication = async () => {
        if (user) {
        const userData = StorageService.getUser();
        try {
          const resp = await AuthService.logout(userData.email);
          // Clear user token and perform any other necessary cleanup
          if (resp.success === 'ok')
              StorageService.clean();
          // Dispatch action to reset user state
          dispatch({ type: 'SET_USER', user: null });
          dispatch({ type: 'EMPTY_BASKET' });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
      

    return (
        <div>
            <nav className='Artists-NavbarItems'>
                <Link to='/' className='nav-link'>
                    <h1 className="artists-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
                </Link>
                <Link to={!user?.firstName ? '/login': '/uploadart'} className='nav-link'>
                    <i className='fa-solid fa-upload'> Upload Art</i>
                </Link>
                <div className='options'>
                    <Link to={!user?.firstName && '/login'} className='header-optionlink'>
                        <div onClick={handleAuthentication} className='header-option'>
                            <span className='header-option-one'>Hello {!user?.firstName ? 'Guest' : user.firstName }</span>
                            <span className='header-option-two'>{user?.firstName ? 'Sign Out' : 'Sign In'}</span>
                        </div>
                    </Link>
                    <Link to={!user?.firstName ? '/login' : '/userprofile'} className='nav-link'>
                        <i className='fa-solid fa-user-circle'></i>
                    </Link>
                </div>
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
                                {Array(rating).fill().map((_, i) => (
                                    <p>⭐️</p>
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