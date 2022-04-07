import React, { useState } from 'react';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ newUserUsername, setNewUserUsername] = useState('');
  const [ newUserPassword, setNewUserPassword] = useState('');
  const [ newUserEmail, setNewUserEmail] = useState('');
  const [ newUserBirthday, setNewUserBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    console.log(newUserUsername, newUserPassword);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(newUserUsername);
  };

  return (
    <form>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </div>
      <div>
        <p>Don't have an account yet?</p>
        <label>
          Username:
          <input type="text" value={newUserUsername} onChange={e => setNewUserUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
        </label>
        <label>
          Birthday:
          <input type="date" value={newUserBirthday} onChange={e => setNewUserBirthday(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmitNew}>Register</button>
      </div>
    </form>
  );
}