import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotifacation } from "../actions/setNotifacation";
import { motion } from "framer-motion";
import "../css/notifacation.scss";

function Notifacation() {
  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotifacation());
    }, 10000);
    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <div className="n-wrapper">
      {notifications.map((notifacation) => {
        return (
          <motion.div
            key={notifacation.data}
            animate={{ x: [420, 0] }}
            transition={{ duration: 1 }}
            className="n-inner"
            style={{
              //backgroundColor: getColor(notifacation.type).main,
              borderLeft: `5px solid ${getColor(notifacation.type).border}`,
            }}
          >
            <div className="n-x-button"></div>
            <p>{notifacation.data}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function getColor(type) {
  switch (type) {
    case "SUCCESS":
      return { main: "#3997037e", border: "#03c703" };
    case "FAILURE":
      return { main: "#971903", border: "#ff0c0c" };
    case "WARNING":
      return { main: "#9794037e", border: "#fae209" };
    default:
      return { main: "#6d21ac7e", border: "#8509fa" };
  }
}

export default Notifacation;
