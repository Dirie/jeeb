import React from "react";

const Input1 = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group ">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        {...rest}
        name={name}
        id={name}
        autoComplete="off"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input1;
