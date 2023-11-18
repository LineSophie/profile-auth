import React from "react";
import styles from './RegistrationForm.module.css'

const RegistrationForm = ({ setNewEmail, setNewPassword, handleCreateNewUser, setNewUser }) => {

  const handleNewUser = () => {
    setNewUser(false)
  };
    
  const handleCreateNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleCreateNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  return (
    <div> 
      <div className={styles.registrationContainer}>
        <h1>Create User</h1>

        <div className={styles.nameInputs}> 
        <input
          id="userName"
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
        />
        </div>
        
        <input
          id="newUserEmail"
          type="text"
          placeholder="Your Email"
          onChange={handleCreateNewEmail}
        />

        <input
          id= "newUserPassword"
          type="password"
          placeholder="Your Password"
          onChange={handleCreateNewPassword}
        />

        <button 
          className={styles.createUserBtn}
          onClick={handleCreateNewUser}>
          Create User
        </button>

        <button  
          className={styles.backBtn} 
          onClick={handleNewUser}>
          Already have an account? Login.
        </button>

      </div>
    </div>
  );
};

export default RegistrationForm;