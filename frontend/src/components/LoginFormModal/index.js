import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoginForm from './LoginForm';
import styles from './LoginForm.module.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const loginTooltip = props => <Tooltip {...props} id='login-tooltip'>Login</Tooltip>

  return (
    <>
      <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 250 }}
          overlay={loginTooltip}>
        <button className={styles.login__btn} onClick={() => setShowModal(true)}><i class="fas fa-sign-in-alt"></i></button>
      </OverlayTrigger>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
