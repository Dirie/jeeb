import React from "react";
import Form from "../common/form";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
// import img from "../img/logo.jpg";
// import img2 from "../img/carousels/carousel3.jpg";

import auth from "../services/authServices";

class Login extends Form {
  state = { data: { email: "", password: "" }, error: {} };
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const data = { ...this.state.data };
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/admin";
    } catch (ex) {
      if (
        (ex.response && ex.response.status === 400) ||
        ex.response.status === 401
      ) {
        const error = { ...this.state.error };
        error.email = ex.response.data.message;
        this.setState({ error });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/admin" />;
    return (
      <div className="container-fluid">
        <div className="row padding">
          <div className="col-md-4" />
          <div className="col-md-4 shadow p-3 mb-5 bg-white rounded my-3">
            <h3 className="title">Log in to the jeeb </h3>

            <hr className="light my-4 text-center" />
            <div>
              <h6 style={{ color: "red" }}>{this.state.err}</h6>
            </div>
            <form onSubmit={this.handleSubmit} className="my-5">
              {this.renderInput1("email", "Email")}
              {this.renderInput1("password", "Password", "password")}
              {this.renderButton("LogIn")}
              <p className="m-3">
                <Link to="/forget-password" className="">
                  Forget Password
                </Link>
              </p>
              <p className="text-right">
                <Link to="/register">Create Jeeb Account</Link>
              </p>
            </form>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default Login;
