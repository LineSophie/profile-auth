import React from "react";
import styles from './ResetPassword.module.css'

function ResetPassword({setEmail, cancelResetPassword, handleResetUserPassword}) {

    const handleCancelReset = () => {
        cancelResetPassword(false);
    }

    return(

        <div className={styles.ResetPasswordContainer}>
            <h1 className={styles.header}>Forgot Password</h1>

            <div className={styles.inputSection}>

                <p>Please enter your email or username to reset your password.</p>

                <input
                    id="userEmail"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className={styles.buttonSection}>
                    <button onClick={handleCancelReset} className={styles.cancelResetBtn}>Cancel</button>
                    <button onClick={handleResetUserPassword} className={styles.resetEmailBtn}>Reset</button>
                </div>
                
            </div>
        </div>
    );

}

export default ResetPassword;