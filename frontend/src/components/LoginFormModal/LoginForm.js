import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { getGroups } from '../../store/group';
import { getInvites } from '../../store/invite';
import styles from './LoginForm.module.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    signInUser(credential, password)
  }

  const demoSignIn = () => {
    signInUser('Demo-User', 'password');
  }

  const signInUser = (credential, password) => {
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => dispatch(getGroups()))
      .then(() => dispatch(getInvites()))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className={styles.login__form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className={styles.login__div}>
        <div className={styles.credential__div}>
          <label>Username or Email</label>
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className={styles.password__div}>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.login__button} type='submit'>Sign In</button>
        <p>or continue as <a href="#" onClick={demoSignIn}>Demo User</a></p>
      </div>
    </form>
  );
}

export default LoginForm;
