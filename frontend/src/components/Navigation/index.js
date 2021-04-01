import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import GroupCreate from '../MainComponents/GroupCreate';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [createGrp, toggleCreateGrp] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }



  return (
    <>
      <ul>
        <li>
          <NavLink exact to='/'>Home</NavLink>
          <button onClick={() => toggleCreateGrp(!createGrp)}>Create a Group</button>
          {isLoaded && sessionLinks}
        </li>
      </ul>
      {createGrp && <GroupCreate />}
    </>
  );
}

export default Navigation;
