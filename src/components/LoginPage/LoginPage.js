import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginPage.module.css"
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import LoginForm from './LoginForm/LoginForm';
import PopupMessage from './PopupMessage/PopupMessage';
import { signInUser } from '../../handles/sign_in_user';
import { addNewUser } from '../../handles/add_new_user';
import { resetUserPassword } from '../../handles/reset_user_password';
import { setUserPersistence } from '../../handles/set_user_persistence';

function LoginPage({setLoginSuccessTrue}) {

    const navigate = useNavigate();

    const [loginNoSuccess, setLoginNoSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUser, setNewUser] = useState(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false) 

    const userSignIn = () => {
      signInUser(email, password, setLoginSuccessTrue, setLoginNoSuccess)
      navigate('/home');
    };
  
    const handleRegisterUser = () => {
      setNewUser(true);
    };

    const handleResetUserPassword = () => {
      resetUserPassword(email, setResetPasswordOpen)
    }  

    const rememberUser = () => {
        setUserPersistence(email, password);
    };

    const handleCreateNewUser = () => {
        addNewUser(newEmail, newPassword, setLoginSuccessTrue, setLoginNoSuccess)
      };

    return(
        <div className={styles.loginPageContainer}>
            {!newUser && 
            <LoginForm 
                setEmail={setEmail}
                setPassword={setPassword}
                setResetPasswordOpen={setResetPasswordOpen}
                resetPasswordOpen={resetPasswordOpen}
                userSignIn={userSignIn}
                rememberUser={rememberUser}
                handleRegisterUser={handleRegisterUser}
                handleResetUserPassword={handleResetUserPassword}
            />
        }

            {newUser && 
                <>
                    <RegistrationForm
                        setNewEmail={setNewEmail}
                        setNewPassword={setNewPassword}
                        setNewUser={setNewUser}
                        handleCreateNewUser={handleCreateNewUser}
                    />

                </>
            }

                {loginNoSuccess && 
                <PopupMessage
                    PopupText="Wrong Username or Password. Please try again."
                    duration={3000} 
                    onTimeout={() => setLoginNoSuccess(false)} 
                />
                }

        </div>
    );
}

export default LoginPage;