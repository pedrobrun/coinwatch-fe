import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/Login.module.scss';

function Login() {
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
    const auth = await axios.post(
      'http://localhost:3000/user/login',
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );

    console.log(auth.data);

    switch (auth.data) {
      case "User doesn't exist":
        toast.error("Username doesn't exist", {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case "Password doesn't match":
        toast.error("Password doesn't match", {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'Successfully logged in.':
        toast.success('User authenticated', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        Router.push('Coins');
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Sign In</div>
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
          />
        </label>
        <input type="submit" value="Sign In" className={styles.sendButton} />
      </form>
    </div>
  );
}

export default Login;
