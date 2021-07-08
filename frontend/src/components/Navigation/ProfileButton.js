import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { emptyGroups } from '../../store/group';
import { emptyInvites } from '../../store/invite';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const userSession = useSelector(state => state.session.user);
  const profileRef = useRef(null);
  const btnRef = useRef(null);


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (btnRef.current && !btnRef.current.contains(e.target) &&
          profileRef.current && !profileRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu, profileRef, btnRef]);

  const profileTooltip = props => <Tooltip {...props} id='profile-tooltip'>User Menu</Tooltip>

  const logout = async e => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    // dispatch(emptyGroups());
    dispatch(emptyInvites());
    history.push('/');
  }

  const tempFunc = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  }

  return (
    <div className={'nav__profile'}>
          <OverlayTrigger
            placement='left'
            delay={{ show: 250, hide: 250 }}
            overlay={profileTooltip}
          >
          <button  ref={btnRef} className={'profile__btn'} onClick={tempFunc}>
              <i className='fas fa-user' />
          </button>
          </OverlayTrigger>
        {showMenu && (
          <ul ref={profileRef} className='profile__dropdown'>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
    </div>
  );
}

export default ProfileButton;
