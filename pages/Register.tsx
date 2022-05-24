import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/Register.module.scss';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPassword('');
    setUsername('');
    const registered = await axios.post('http://localhost:3000/user/register', {
      username: username,
      password: password,
    });

    if (registered.data === 'Username already in use.') {
      toast.error('Username already in use.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (registered.data === 'User created.') {
      toast.success('User successfully registered!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Sign Up</div>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <label className={styles.label}>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>

        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.psswrdInput}
          />
        </label>
        <input type="submit" value="Sign up" className={styles.sendButton} />
      </form>
    </div>
  );
}

export default Register;
