import React, { Component, useEffect, useState } from "react";
import { setLogged } from "../../../actions/setLogged";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../actions/setUser";
import useAxios from "axios-hooks";
import { Link, Redirect } from "react-router-dom";

function Callback(props) {
  let { token, refresh } = props.match.params;
  const user = useSelector((state) => state.user);

  const [{ data, loading, error }, refetch] = useAxios({
    url: "https://discord.com/api/v8/users/@me",
    credentials: "include",
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const isLogged = useSelector((state) => state.logged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      localStorage.setItem("_dsToken", token);
      localStorage.setItem("_dsRefresh", refresh);
      dispatch(setUser(data));
      dispatch(setLogged());
      console.log(data);
    }
  }, data);

  if (isLogged) return <Redirect to="/"></Redirect>;

  if (user.username)
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>Welcome {user.username}, you are being redirected!</h1>
        <Redirect to="/"></Redirect>
      </div>
    );

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Please wait while we try to log you in!</h1>
    </div>
  );
}

/*
class callback extends Component {
  state = {};

  componentDidMount() {
    const { token, refresh } = this.props.match.params;

    localStorage.setItem("_dsToken", token);
    localStorage.setItem("_dsRefresh", refresh);

    getUser(token).then((res) => {
      console.log(res);
    });
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
});

const mapDispachToProps = (user) => {
  return { setLogged, setUser };
};

export default connect(mapStateToProps, mapDispachToProps())(callback);

*/

export default Callback;
