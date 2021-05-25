import React, { Component } from "react";
import Home from "./components/pages/home";
import BotPage from "./components/pages/bot";
import { Route, Redirect, Switch } from "react-router-dom";
import "./css/index.scss";
import AddPage from "./components/pages/add";
import VotePage from "./components/pages/vote";
import ProfilePage from "./components/pages/profile";
import ErrorPage from './components/error';
import EditPage from "./components/pages/edit";
import Notifacation from "./components/notification";
import Callback from "./components/pages/auth/callback";
import { config } from "./config";
import Navbar from "./components/navigation/navbar";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Switch>
          <Route path="/callback/:token/:refresh" component={Callback}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/bots/:id" component={BotPage}></Route>
          <Route
            path="/login"
            component={() => {
              window.location.href = `${config.backend}/v1/oauth/login`;
              return <></>;
            }}
          ></Route>
          <Route path="/bots/:id/edit" component={EditPage}></Route>
          <Route path="/v/:id" component={VotePage}></Route>
          <Route path="/add" component={AddPage}></Route>
          <Route path="/profile/:id" component={ProfilePage}></Route>
          <Route path="/404" component={ErrorPage}></Route>
          <Redirect to="/404"></Redirect>
        </Switch>
        <Notifacation></Notifacation>
      </div>
    );
  }
}

export default App;
