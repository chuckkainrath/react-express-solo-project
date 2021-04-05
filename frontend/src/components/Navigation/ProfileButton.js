import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { emptyGroups } from '../../store/group';
import { emptyInvites } from '../../store/invite';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const userSession = useSelector(state => state.session.user);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => setShowMenu(false);

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = async e => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    // dispatch(emptyGroups());
    // dispatch(emptyInvites());
    history.push('/');
  }

  return (
    <div className={'nav__profile'}>
        <button  className={'profile__btn'} onClick={() => setShowMenu(true)}>
          <i className='fas fa-user' />
        </button>
        {showMenu && (
          <ul className='profile__dropdown'>
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
