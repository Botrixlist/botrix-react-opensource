import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./NavbarData";
import { useSelector } from "react-redux";
import { config } from "../../config";
import "../../css/navbar.scss";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as FaBars from "react-icons/fa";

function Navbar() {
  const user = useSelector((state) => state.user);

  return (
    <header>
      <Link class="logo" to="/">
        <img class="logo" src="/logo.png"></img>
      </Link>
      <nav>
        <ul class="nav__links">
          <li>
            <Link to="/trending">Trending</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </ul>
      </nav>
      {user.username ? (
        <Link
          className="login-button"
          to="/profile/me"
        >
          {user.username}
        </Link>
      ) : (
        <a className="login-button" href={`${config.backend}/v1/oauth/login`}>Login</a>
      )}
    </header>
  );
}

export default Navbar;
