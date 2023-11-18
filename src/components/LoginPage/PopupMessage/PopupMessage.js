import React, { useState, useEffect } from "react";
import styles from './PopupMessage.module.css'

function PopupMessage({ PopupText, duration, onTimeout }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onTimeout) {
        onTimeout();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onTimeout]);

  return (
    <div className={styles.popupMessageContainer}>
      {visible && 
      <>
      <i class="fa fa-exclamation-triangle"></i>
      <p>{PopupText}</p>
      </>
      
      }
    </div>
  );
}

export default PopupMessage;