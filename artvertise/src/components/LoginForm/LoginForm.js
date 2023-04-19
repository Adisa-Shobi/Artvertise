import React, { useState } from 'react'
import './LoginFormStyles.css'
import AuthService from '../../Services/auth.service.js';
import StorageService from '../../utils/storage.utils.js';
import { Link, useHistory } from 'react-router-dom'
// import image0 from '../images/image-7.jpg'


function LoginForm() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


     const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.login(email, password);
	if (response.status === 200)
	{
	    const user = await response.json();
	    StorageService.saveUser(user);
	    history.push('/artists');
	} else {
	    const data = await response.json()
	    alert(data.error);
	}
    } catch (error) {
	console.error(error);
    }
  };

  return (
    <div className='login-form'>
      <div className='left'>
        <Link to='/' className='nav-link'>
          <h1 className='logo-login'>
            Artvertise <i className='fa-brands fa-artstation'></i>{' '}
          </h1>
        </Link>
        <form className='login-forminput' onSubmit={handleSubmit}>
          <input
            placeholder='Email Address*'
            type='text'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder='Password*'
            type='password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className='login-button' type='submit'>
            Sign in
          </button>
        </form>
        <p className='signup-redirect'>
          Don't have an account yet? <a href='/signup'>Sign up</a>
        </p>
      </div>
      <div className='right'>
        <img
          className='login-image'
          src='https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=400'
          alt='login'
        />
      </div>
    </div>
  );
}

export default LoginForm;
