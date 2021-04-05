import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import styles from './LoginForm.module.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.login__btn} onClick={() => setShowModal(true)}>
        <i class="fas fa-sign-in-alt"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
