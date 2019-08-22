import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../../services/authServices";
import Sidebar from "./sidebar";

class Admin extends Component {
  state = {};
  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <>
        <Sidebar />
      </>
    );
  }
}

export default Admin;
