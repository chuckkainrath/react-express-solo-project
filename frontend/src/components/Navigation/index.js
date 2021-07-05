import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import GroupCreate from '../MainComponents/GroupCreate';
import InviteDropdown from '../MainComponents/InviteDropdown';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [createGrp, toggleCreateGrp] = useState(false);
  const invites = useSelector(state => state.invite.invites);
  const [showInvites, toggleShowInvites] = useState(false);

  const homeTooltip = props => <Tooltip {...props} id='home-tooltip'>Home</Tooltip>
  const newAccountTooltip = props => <Tooltip {...props} id='new-tooltip'>Create an Account</Tooltip>
  const nexusTooltip = props => <Tooltip {...props} id='nexus-tooltip'>Home</Tooltip>

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 250 }}
          overlay={newAccountTooltip}
        >
          <NavLink className='sign-up__link' to='/signup'><i class="fas fa-user-plus"></i></NavLink>
        </OverlayTrigger>
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
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 250 }}
          overlay={homeTooltip}
        >
          <NavLink className='home__icon' exact to='/'><i class="fas fa-home-lg-alt"></i></NavLink>
        </OverlayTrigger>
      </div>
      {isLoaded && sessionLinks}
      <div className='group-create__wrapper'>
        {sessionUser && <button className='group__create' onClick={groupClick}><i class="fas fa-plus-square"></i></button>}
        {createGrp && sessionUser && <GroupCreate toggleCreateGrp={toggleCreateGrp} />}
      </div>
      <OverlayTrigger
        placement='left'
        delay={{ show: 250, hide: 250 }}
        overlay={nexusTooltip}
      >
        <div tabindex='0' className='title' onClick={() => history.push('/')}>Nexus</div>
      </OverlayTrigger>
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
