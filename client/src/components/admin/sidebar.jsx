import React, { Component } from "react";
import { Link } from "react-router-dom";
// import NotFound from "./../notfound";

class Admin extends Component {
  state = {};
  render() {
    return (
      <div className=".bg-dark">
        <nav>
          <ul>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Admin;
