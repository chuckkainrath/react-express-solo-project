import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { emptyGroups } from '../../store/group';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => setShowMenu(false);

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(emptyGroups());
  }

  return (
    <>
      <button onClick={() => setShowMenu(true)}>
        <i className='fas fa-user' />
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
