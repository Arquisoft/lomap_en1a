import React from "react";

interface LoadingSpinnerProps{
  message?:string
}

export default function LoadingSpinner(props:LoadingSpinnerProps) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <p>{props.message}</p>
    </div>

  );
}
