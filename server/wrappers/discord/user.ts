import axios from "axios";
import { BOT } from "../../settings/config";

export function user(token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://discord.com/api/v8/users/@me", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

export function userId(id: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://discord.com/api/v8/users/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + BOT.TOKEN,
        },
      })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
