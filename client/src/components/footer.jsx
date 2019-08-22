import React from "react";
import logo from "../img/logo2.jpg";

const Footer = () => {
  return (
    <footer>
      <hr className="light" />
      <div className="container-fluid padding">
        <div className="row padding">
          <div className="col-md-12">
            <img src={logo} alt="" />
          </div>
          <hr className="light" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
