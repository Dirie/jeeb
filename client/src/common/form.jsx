import React, { Component } from "react";
import Joi from "joi-browser";
import Input1 from "./input";
import Select from "./select";
import Input2 from "./input2";
import ReactPhoneInput from "react-phone-input-2";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    const data = this.state.data;
    if (Object.keys(data).length > 2) {
      if (data["confirm_Password"] !== data["password"]) {
        const err = "password must match!";
        return err;
      }
    }

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate_password = ({ value }) => {
    const data = { ...this.state.data };
    let error = "";
    if (value !== data["password"]) {
      error = "password must match";
      return error;
    }
    return null;
  };
  handleSubmit = e => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;

    this.doSubmit();
  };
  handleChanage = ({ currentTarget: input }) => {
    const error = { ...this.state.error };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) error[input.name] = errorMessage;
    else if (input.name === "confirm_Password") {
      error[input.name] = this.validate_password(input);
    } else delete error[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, error });
  };

  handleChanagePhone = value => {
    const data = { ...this.state.data };
    this.setState({ phone: value });
    data["phone"] = this.state.phone;
    this.setState({ data });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput1(name, label, type = "text") {
    const { data, error } = this.state;
    return (
      <Input1
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChanage}
        error={error[name]}
      />
    );
  }

  renderInput2(name, label, col_size, type = "text") {
    const { data, error } = this.state;
    return (
      <Input2
        name={name}
        type={type}
        col_size={col_size}
        value={data[name]}
        label={label}
        onChange={this.handleChanage}
        error={error[name]}
      />
    );
  }
  renderInputPhone(label, col_size) {
    // const { data, error } = this.state;
    const classes = "form-group col-md-" + col_size;
    return (
      <div className={classes}>
        <label htmlFor={label}>{label}</label>
        <ReactPhoneInput
          className="form-control"
          value={this.state.phone}
          defaultCountry={"so"}
          onChange={this.handleChanagePhone}
        />
      </div>
    );
  }

  renderSelect(name, label, options) {
    const { data, error } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={this.handleChanage}
        error={error[name]}
      />
    );
  }
}

export default Form;
