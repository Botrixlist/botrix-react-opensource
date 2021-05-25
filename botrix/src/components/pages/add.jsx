import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AddForm from "../forms/addForm";

function AddPage() {
  const isLogged = useSelector((state) => state.logged);

  useEffect(() => {
    if (!isLogged) return <Redirect to="/login"></Redirect>;
  }, [isLogged]);

  return (
    <div className="form-container">
      <h1>Add your bot to Botrix!</h1>
      <p>
        We appreciate you wanting to add your bot to Botrix, before you do
        please read the requirements!
      </p>

      <div className="form-containers">
        <AddForm></AddForm>
      </div>
    </div>
  );
}

export default AddPage;
