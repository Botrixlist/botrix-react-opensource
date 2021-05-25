import { get } from "axios";

function user(token) {
  return new Promise((resolve, reject) => {
    let user = get("https://discord.com/api/v8/users/@me", {
      credentials: "include",
      method: "get",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default user;
