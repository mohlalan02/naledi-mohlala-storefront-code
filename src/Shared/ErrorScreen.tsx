import React from 'react';
import './ErrorScreen.css';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  iconSrc?: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = 'Oops! Something went wrong.',
  message = 'Please try again later.',
  iconSrc,
  onRetry,
}) => {
  return (
    <div className="error-screen" role="alert">
      {iconSrc && <img src={iconSrc} alt="Error" className="error-icon" />}
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};
