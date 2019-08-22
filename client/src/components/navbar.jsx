import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../img/logo.jpg";
import auth from "../services/authServices";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderNav = (user, classOne) => {
    const menusHome = [
      { id: 1, menu: "Home" },
      { id: 2, menu: "Features" },
      { id: 3, menu: "Services" },
      { id: 4, menu: "Connections" },
      { id: 5, menu: "Contacts" },
      { id: 6, menu: "Login" },
      { id: 7, menu: "Register" }
    ];
    const menusAdmin = [{ id: 1, menu: "User Name" }];

    const navAdmin = (
      <div className={classOne} id="navbarResponsive">
        <ul className="navbar-nav ml-auto ">
          {menusAdmin.map(m => (
            <li key={m.id} className="nav-item">
              <Link className="nav-link" to={`/${m.menu}`}>
                {m.menu}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );

    const navHome = (
      <div className={classOne} id="navbarResponsive">
        <ul className="navbar-nav ml-auto ">
          {menusHome.map(m => (
            <li key={m.id} className="nav-item">
              <Link
                className={
                  m.id < 6
                    ? "nav-link"
                    : m.id === 6
                    ? "btn btn-outline-secondary btn-md my-2"
                    : "btn btn-primary btn-md my-2"
                }
                to={`/${m.menu}`}
              >
                {m.menu}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
    // console.log(user);
    if (user) {
      return navAdmin;
    } else {
      return navHome;
    }
  };

  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";
    const user = auth.getCurrentUser();
    // console.log(user);
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-light bg-light">
        <Link className="navbar-brand " to="/">
          <img src={img} alt="" className="" />
        </Link>
        <button
          className={classTwo}
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.toggleNavbar}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {this.renderNav(user, classOne)}
      </nav>
    );
  }
}

export default Navbar;
