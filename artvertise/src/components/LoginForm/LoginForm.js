import React from 'react'
import './LoginFormStyles.css'
// import image0 from '../images/image-7.jpg'


function LoginForm() {
  return (
    <div className='login-form'>
        <div className='left'>
        <h1 className="logo-login">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
            <form className='login-forminput'>
                <input placeholder='Email Address*' type='text' required/>
                <input placeholder='Password*' type='password' required/>
                <button className='login-button'><a href='/artists' className='artists-link'>Sign in</a></button>
            </form>
            <p className='signup-redirect'>Don't have an account yet? <a href='/signup'>Sign up</a></p>
        </div>
        <div className='right'>
            <img className='login-image' src='https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=400' alt='login'/>
        </div>
    </div>
  )
}

export default LoginForm