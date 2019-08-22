import React from "react";
import b1 from "../img/carousels/carousel1.jpg";
import b2 from "../img/carousels/carousel2.jpg";
import b3 from "../img/carousels/carousel3.jpg";
import auth from "../services/authServices";
import { Redirect } from "react-router-dom";
import Footer from "./footer";
const Home = () => {
  if (auth.getCurrentUser()) return <Redirect to="/admin" />;
  return (
    <React.Fragment>
      <div id="slider" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#slider" data-slide-to="0" className="active" />
          <li data-target="#slider" data-slide-to="1" />
          <li data-target="#slider" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={b1} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>The art of Love</h1>
              <h3>The love before hate</h3>
              <button className="btn btn-outline-light btn-lg">Vew Domo</button>
              <button className="btn btn-primary btn-lg">Get Started</button>
            </div>
          </div>
          <div className="carousel-item">
            <img src={b2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={b3} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
