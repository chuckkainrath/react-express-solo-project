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
        <NavLink className='sign-up__link' to='/signup'><i class="fas fa-user-plus"></i></NavLink>
      </>
    );
  }

  const groupClick = () => {
    toggleCreateGrp(!createGrp);
    toggleShowInvites(false);
  }

  const inviteClick = () => {
    toggleShowInvites(!showInvites)
    toggleCreateGrp(false);
  }

  return (
    <div className='nav__bar'>
      <div className='home__div'>
        <NavLink className='home__icon' exact to='/'><i class="fas fa-home-lg-alt"></i></NavLink>
      </div>
      {isLoaded && sessionLinks}
      <div className='group-create__wrapper'>
        {sessionUser && <button className='group__create' onClick={groupClick}><i class="fas fa-plus-square"></i></button>}
        {createGrp && sessionUser && <GroupCreate toggleCreateGrp={toggleCreateGrp} />}
      </div>
      <div className='title'>Nexus</div>
      <div className='invite__div'>
        {sessionUser && <button className='invite__btn' onClick={inviteClick}>
          <i class="fas fa-inbox">
            {invites.length > 0 && <span className='invite__count'>{invites.length}</span>}
          </i>
        </button>}
        {showInvites && sessionUser && invites.length > 0 && <InviteDropdown invites={invites} />}
      </div>
    </div>
  );
}

export default Navigation;
