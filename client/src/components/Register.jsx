import React from "react";
import { Link } from "react-router-dom";
import Form from "../common/form";
import Joi from "joi-browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import userService from "../services/userServices";
import auth from "../services/authServices";

class Register extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirm_Password: ""
    },
    error: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .min(4)
      .max(100)
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .min(4)
      .max(100)
      .label("Last Name"),
    phone: Joi.string()
      .required()
      .min(8)
      .max(100)
      .label("Phone"),
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(100)
      .label("Email"),
    password: Joi.string()
      .min(5)
      .max(100)
      .required()
      .label("Password"),
    confirm_Password: Joi.string()
      .min(5)
      .max(100)
      .required()
      .label("Confirm password")
  };

  doSubmit = async () => {
    const data1 = { ...this.state.data };
    const { data } = await userService.read_Users(data1.email);
    if (data) {
      const error = { ...this.state.error };
      error.email = "This email has already exist";
      this.setState({ error });
    } else {
      try {
        delete data1.confirm_Password;
        const response = await userService.register(data1);
        auth.loginWithJwt(response.headers["x-auth-token"]);
        window.location = "/admin";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const error = { ...this.state.error };
          error.username = ex.response.data;
          this.setState({ error });
        }
      }
    }
  };

  render() {
    const fontCoffee = <FontAwesomeIcon icon={faUserPlus} className="mx-2" />;
    return (
      <div className="container-fluid">
        <div className="row padding">
          <div className="col" />
          <div className="col-md-5 shadow-sm p-3 mb-5 bg-white rounded my-3">
            <div className="text-left padding">
              <h3 className=""> {fontCoffee} Register New User </h3>
            </div>

            <hr className="light my-4 text-center" />
            <form onSubmit={this.handleSubmit} className="my-5">
              <div className="form-row">
                {this.renderInput2("firstName", "First Name", 6)}
                {this.renderInput2("lastName", "Last Name", 6)}
                {this.renderInputPhone("Phone Number", 12)}
                {this.renderInput2("email", "Email", 12)}
                {this.renderInput2("password", "Password", 12, "password")}
                {this.renderInput2(
                  "confirm_Password",
                  "Confirm Password",
                  12,
                  "password"
                )}
              </div>

              {this.renderButton("Register")}

              <p className="text-right my-4">
                <Link to="/login">Have one, Login >></Link>
              </p>
            </form>
          </div>
          <div className="col" />
        </div>
      </div>
    );
  }
}

export default Register;
