import React from "react";
import { Form, ButtonToolbar, Button, Content } from "rsuite";
import "../../styles.css";
import classNames from "classnames/bind";

import style from "./signup.module.scss";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);
interface signupformdata {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_number: number;
}
const SignUp = (): JSX.Element => {
  const [state, setstate] = React.useState<signupformdata>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact_number: 0,
  });
  
  //usenavigate hook

  const navigate = useNavigate();
  const handleChangeSignUp = (label: string, value: string) => {
    let newValue =
      state[label as keyof signupformdata] === 0 ? parseInt(value) : value;
    setstate({ ...state, [label]: newValue });
  };
  
  //post request for creating a user
  const handleSubmit = async (body: {}) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/platform/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("body")}>
      <div>
        <img
          className={cx("image")}
          src="https://img.freepik.com/free-photo/woman-writing-diary_1162-120.jpg"
          alt="login_image"
        />
      </div>
      <div className={cx("login_form")}>
        <Form className={cx("form_login")}>
          <Form.Group controlId="name-6">
            <Form.ControlLabel>Firstname</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="first_name"
              placeholder="Enter Your name "
              onChange={(value) => handleChangeSignUp("first_name", value)}
            />
          </Form.Group>
          <Form.Group controlId="name-6">
            <Form.ControlLabel>Lastname</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="last_name"
              placeholder="Enter Your LastName"
              onChange={(value) => handleChangeSignUp("last_name", value)}
            />
          </Form.Group>
          <Form.Group controlId="email-6">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="email"
              type="email"
              placeholder="Enter email here"
              onChange={(value) => handleChangeSignUp("email", value)}
            />
          </Form.Group>
          <Form.Group controlId="password-6">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="password"
              type="password"
              autoComplete="off"
              maxLength={10}
              placeholder="Enter password here"
              onChange={(value) => handleChangeSignUp("password", value)}
            />
          </Form.Group>
          <Form.Group controlId="name-6">
            <Form.ControlLabel>Contact Number</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="contact_number"
              placeholder="Enter Contact Number"
              type="number"
              onChange={(value) => handleChangeSignUp("contact_number", value)}
            />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <div className={cx("button_div")}>
                <div>
                  <Button
                    className={cx("button")}
                    appearance="primary"
                    onClick={() => handleSubmit(state)}
                  >
                    SignUp
                  </Button>
                </div>
                <h5>
                  {" "}
                  Already have an account <Link to="/login">Login !!</Link>{" "}
                </h5>
              </div>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
