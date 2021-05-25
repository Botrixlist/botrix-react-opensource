import React from "react";

function ErrorMessage(props) {
  return (
    <div className="error-container">
      <div className="error-reason">
        <p>{props.reason}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
