import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "fontawesome";
import Navbar from "./components/navbar";
import Register from "./components/Register";
import Services from "./components/Services";
import Supports from "./components/supports";
import Login from "./components/Login";
import NotFound from "./components/notfound";
import Home from "./components/Home";
import Contacts from "./components/contacts";
import Admin from "./components/admin/admin";

class App extends Component {
  state = {
    isLogin: false
  };

  render() {
    return (
      <div className=".bg-dark">
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/Home" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/supports" component={Supports} />
            <Route path="/services" component={Services} />
            <Route path="/contacts" component={Contacts} />
            <Redirect from="/" exact to="/Home" />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
