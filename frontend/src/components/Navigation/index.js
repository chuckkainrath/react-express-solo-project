import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import GroupCreate from '../MainComponents/GroupCreate';
import InviteDropdown from '../MainComponents/InviteDropdown';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [createGrp, toggleCreateGrp] = useState(false);
  const invites = useSelector(state => state.invite.invites);
  const [showInvites, toggleShowInvites] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className='sign-up__link' to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav__bar'>
      <NavLink className='home__icon' exact to='/'><i class="fas fa-home-lg-alt"></i></NavLink>
      {isLoaded && sessionLinks}
      <div className='group-create__wrapper'>
        {sessionUser && <button className='group__create' onClick={() => toggleCreateGrp(!createGrp)}><i class="fas fa-plus-square"></i></button>}
        {createGrp && <GroupCreate toggleCreateGrp={toggleCreateGrp} />}
      </div>
      <div>
        {sessionUser && <button onClick={() => toggleShowInvites(!showInvites)}>
          <i class="fal fa-inbox">
            {invites && <i class="fas fa-exclamation"></i>}
          </i>
        </button>}
        {showInvites && <InviteDropdown invites={invites} />}
      </div>
    </div>
  );
}

export default Navigation;
