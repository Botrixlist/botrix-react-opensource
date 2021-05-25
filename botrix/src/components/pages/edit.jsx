import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import EditForm from "../forms/editForm";
import Preloader from "../preloader";
import { config } from "../../config";
import "../../css/edit.scss";

function EditPage(props) {
  let [{ data, loading, error }, refetch] = useAxios({
    url: `${config.backend}/v1/get/bots/${props.match.params.id}`,
    method: "GET",
    headers: {
      authorization: `${localStorage.getItem("_dsToken")}`,
    },
  });

  let [bot, setBot] = useState();

  useEffect(() => {
    if (data) {
      console.log(data.bot);
      setBot(data.bot);
    }
  }, data);

  if (loading) return <Preloader></Preloader>;

  return (
    <div>
      <div className="form-container">
        <h1>You are editing {bot?.username}</h1>

        <div className="form-containers">
          <EditForm bot={bot}></EditForm>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
