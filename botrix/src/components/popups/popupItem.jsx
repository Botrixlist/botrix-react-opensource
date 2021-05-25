import React from "react";

function PopupItem(props) {
  return (
    <div
      className={`${
        props.current === props.name ? "visible" : ""
      } api-settings`}
    >
      {props.children}
    </div>
  );
}

export default PopupItem;
