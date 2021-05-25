import React from "react";

function Input(props) {
  return (
    <div className="input-container">
      <input
        type="text"
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        className="form-input"
      />
      <div className="requirements">
        {props.requirements.map((requirement) => {
          return <p className="text-requirements">- {requirement}</p>;
        })}
        {props.required ? (
          <p className="text-requirements">- This field is required!</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Input;
