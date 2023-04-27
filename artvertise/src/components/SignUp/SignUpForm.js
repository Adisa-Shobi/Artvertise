import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/auth.service';
// import StorageService from '../../utils/storage.utils';

function SignUpForm() {
  // const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  console.log(password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.signup(
        firstName,
        lastName,
        email,
        password,
        country,
        state,
        city
      );
      console.log(response); // handle response
      if(response.ok) {
        // console.log("Storing Data >>>", response.body)
        // StorageService.setUser(response.data.json());
        //history.push('/artists')

        console.log('Redirecting to the artists Page ...')
        window.location.href = '/login';
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" className="nav-link">
        <nav className="Signup-NavbarItems">
          <h1 className="signup-logo">
            Artvertise <i className="fa-brands fa-artstation"></i>{' '}
          </h1>
        </nav>
      </Link>

      <div className="create-account">
        <h3>Create Your Account</h3>
        <h5>Account Information</h5>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="FirstName*"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            placeholder="LastName*"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Email*"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Country*"
            value={country}
            required
            onChange={(event) => setCountry(event.target.value)}
          />
          <input
            type="text"
            placeholder="State*"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
          <input
            type="text"
            placeholder="City*"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password*"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className='signup-button' type='submit'>Create Your Account</button>
        </form>
        <p className="redirect-signin">
          Already you have an account? <a href="/login">Sign-in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
