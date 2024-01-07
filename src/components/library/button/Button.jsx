/* eslint-disable react/prop-types */

import "./style.css";

const Button=({
  onClickEvent,
  text,
  style,
}) =>{
  return (
    <button
      className="submit_btn"
      onClick={onClickEvent}
      style={style}
    >
      {text}
    </button>
  );
}

export default Button