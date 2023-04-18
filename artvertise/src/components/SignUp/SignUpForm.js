import React from 'react'
import './SignUpForm.css'
import { Link } from 'react-router-dom'
//import Hero from './Hero'


function SignUpForm() {
  return (
    <div>
      <Link to='/' className='nav-link'>
        <nav className='Signup-NavbarItems'>
            <h1 className="signup-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
        </nav>
        </Link>

        <div className='create-account'>
            <h3>Create Your Account</h3>
            <h5>Account Information</h5>
            <form className='signup-form'>
                <input type='text' placeholder='FirstName*' /> 
                <input type='text' placeholder='LastName*' /> 
                <input type='text' placeholder='Email*' />
                <input type='text' placeholder='Country*' />
                <input type='text' placeholder='State*' />
                <input type='text' placeholder='City*' />
                <input type='password' placeholder='Password*' />
                {/* <input type='checkbox' id='terms'/>
                <label className='terms' for="terms">Agree to the terms and policies</label> */}
                <button className='signup-button'><a href='/artists' className='artist-link'>Create Your Account</a></button>
            </form>
            <p className='redirect-signin'>Already you have an account? <a href='/login'>Sign-in</a></p>
        </div>
    </div>
  )
}

export default SignUpForm