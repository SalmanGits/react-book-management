/* eslint-disable react/prop-types */
import "./style.css";
const Input = ({
  label,
  type,
  placeholder,
  onChange,
  error,
  value,
  eye,
  handleType,
  style,
  labelStyle,
  name

}) => {
  return (
    <div className="input_parent_div">
      <label style={labelStyle} className="label_style">
        {label}
      </label>

      <div className="input_wrapper" style={style}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="add_input"
        />
        <div
          className="input_eye_btn"
          onClick={handleType}
          style={{ display: eye ? "flex" : "none" }}
        >
          {eye}
        </div>
      </div>

      <p className="input_error">{error ? "*" + error : null}</p>
    </div>
  );
}

export default Input;
