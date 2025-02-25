import React from 'react';
import styles from './ErrorMessage.module.scss'; 

interface ErrorMessageProps {
  message: string; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;