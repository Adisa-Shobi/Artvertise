import React, { useState } from 'react';
import './LoginFormStyles.css';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../../Services/auth.service'
import StorageService from '../../utils/storage.utils';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory()

  console.log(email);
  console.log(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
	try {
		const response = await AuthService.login(email, password);
		console.log(response)
		//console.log('USER>>>', response.user)
		//console.log('USER JSON ----->', response.success)

		if(response.ok) {
			const data = await response.user;
			console.log(data)
			StorageService.saveUser(data)
			console.log("about to redirect to /artists");

			history.push('/artists')

			// window.location.href = '/artists';
		} else {
			// const data = await response.user
	    	// alert(data.error);
			alert("Cannot login")
		} 
	} catch (error) {
		console.error(error)
	}
  };

  return (
    <div className='login-form'>
      <div className='left'>
        <Link to='/' className='nav-link'>
          <h1 className="logo-login">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
        </Link>
        <form className='login-forminput' onSubmit={handleSubmit}>
          <input
            placeholder='Email Address*'
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Password*'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login-button'>Sign in</button>
        </form>
        <p className='signup-redirect'>Don't have an account yet? <a href='/signup'>Sign up</a></p>
      </div>
      <div className='right'>
        <img className='login-image' src='https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=400' alt='login'/>
      </div>
    </div>
  );
}

export default LoginForm;
