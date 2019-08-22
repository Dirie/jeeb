import React from "react";

const Input2 = ({ name, label, col_size, error, ...rest }) => {
  const classes = "form-group col-md-" + col_size;
  return (
    <div className={classes}>
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

export default Input2;
