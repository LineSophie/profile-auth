import React, { useState } from "react";
import styles from "./LoginForm.module.css"
import ResetPassword from "../ResetPassword/ResetPassword";

const LoginForm = ({ 
  setEmail, 
  setPassword, 
  userSignIn, 
  handleRegisterUser, 
  handleResetUserPassword, 
  resetPasswordOpen, 
  setResetPasswordOpen,
  rememberUser}) => {

  const [rememberMe, setRememberMe] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpenPasswordModal = () => {
    setResetPasswordOpen(true);
  }

  const handleRememberUser = () => {
    setRememberMe(true);
  };

  const handleSignInWithRememberMe = async () => {
    userSignIn();

    if (rememberMe) {
      rememberUser();
    }
  };

  return (
    <div> 

      {!resetPasswordOpen &&  
          <div className={styles.loginFormContainer}>
      <h1>Login</h1>

      <input
        id="userEmail"
        type="text"
        placeholder="Email"
        onChange={handleEmailChange}
      />

      <input
        id="userPassword"
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />

      <div className={styles.otherActions}>
        <input 
          className={styles.itemFloatLeft}
          id= "remember" 
          name="rememberMe" 
          type="checkbox"
          onChange={handleRememberUser}

        /> 
        <label className={styles.itemFloatLeft} htmlFor="remember">Remember Me</label>
        <button 
         className={styles.itemFloatRight} 
         onClick={handleOpenPasswordModal}>
          Forgot Password?
        </button>
        
      </div>

      <button 
        className={styles.signInBtn}
        onClick={handleSignInWithRememberMe}>
        Login
      </button>

      <button 
        className={styles.registerUserBtn}
        onClick={handleRegisterUser}
      >
        Don't have an account yet? Register.
      </button>
      </div>
      }

      {resetPasswordOpen && 
      <ResetPassword
        setEmail={setEmail}
        cancelResetPassword={setResetPasswordOpen}
        handleResetUserPassword={handleResetUserPassword}
      /> 
      }

    </div>

  );
};

export default LoginForm;