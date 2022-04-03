import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import propTypes from 'prop-types';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://fernando-myflix-3.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful! Please login to continue.');
          window.open('/', '_self')
        })
        .catch(response => {
          console.error(response);
          alert('Unable to create account');
        });
    }
  };


  return (
    <form>
      <h3>Create Your Account</h3>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
      <p>Already have an account? <button type="submit" onClick="#">Login</button></p>
    </form>
  );
}

RegistrationView.propTypes = {
    register: propTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func
};