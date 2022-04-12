import React, {useState} from 'React';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birhday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
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
            Password:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <div>
            <div>
                <label for="dateofbirth">Birthday</label>
                <div>
                    <input type="date" name="dateofbirth" id="dateofbirth" />
                </div>
            </div>
        </div>

        <label>
            Password:
            <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}
