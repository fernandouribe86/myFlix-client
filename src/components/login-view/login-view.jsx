import React, { useState } from 'react';
import { RegistrationView} from '../registration-view/registration-view';
import {useHistory} from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const register = () => {
    history.push('../registration-view/registration-view.jsx')
  }

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const registrationSubmit = (e) =>{
    e.preventDefault();
    props.onClick(< RegistrationView />)
  }

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <p>Don't have an account? <button type="submit" onClick={register}>Register</button></p>
    </form>
  );
}