import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { getInvites } from '../../store/invite';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import styles from './SignUpForm.module.css';

function SignUpForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to='/' />
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signUp({username, email, password}))
        .catch(async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  }

  const signinDemo = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-User', password: 'password' }))
      .then(() => dispatch(getGroups()))
      .then(() => dispatch(getInvites()))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className={styles.signup__form} onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className={styles.signup__data}>
        <div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required />
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Sign Up</button>
        <p>or continue as <a onClick={signinDemo} href="#">Demo User</a></p>
      </div>
    </form>
  );
}

export default SignUpForm;
