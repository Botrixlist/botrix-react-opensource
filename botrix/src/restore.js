import react, { useEffect, useState } from "react";
import axios from "axios";
import getUser from "./wrappers/discord/user";
import { setUser } from "./actions/setUser";
import { setLogged } from "./actions/setLogged";
import { useSelector, useDispatch } from "react-redux";
import qs from "querystring";
import Preloader from "./components/preloader";

export default function Restore(props) {
  const isLogged = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [hasRestored, setRestored] = useState(false);
  let token = localStorage.getItem("_dsToken");
  let refresh = localStorage.getItem("_dsRefresh");

  if (token && refresh && !isLogged) {
    getUser(token)
      .then((res) => {
        dispatch(setUser(res));
        dispatch(setLogged());
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status == 403) {
          let data = {
            client_secret: "",
            clinet_id: "",
            grant_type: "refresh-token",
            refresh_token: refresh,
            redirect_uri: "http://localhost:3001/callback",
            scope: "identify guilds",
          };

          axios
            .post(
              "https://discord.com/api/v8/oauth2/token",
              qs.stringify(data),
              {
                headers: {
                  "Content-Type": "application/x-ww-form-urlencoded",
                },
              }
            )
            .then((res) => {
              dispatch(setUser(res));
              dispatch(setLogged());
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });
  } else if(!token && !refresh && !hasRestored) {
    setRestored(true);
    setLoading(false);
  }

  if (loading) return <Preloader></Preloader>;

  return <div>{props.children}</div>;
}
