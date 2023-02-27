import React, { useState, useContext } from "react";
import { Form, ButtonToolbar, Button, Message, useToaster } from "rsuite";

import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import "../../styles.css";
import Authcontext from "../Context/Auth";

const cx = classNames.bind(style);
interface loginFormData {
  email: string;
  password: string;
}
const Login = (): JSX.Element => {
  const [state, setstate] = useState<loginFormData>({
    email: "",
    password: "",
  });

  const toaster = useToaster();
  const navigate   = useNavigate();

  /////
  const { isAuthenticated, setIsAuthenticated } = useContext(Authcontext);
  console.log(isAuthenticated, "isAuthenticated in react");
 

  const handleLoginPasswordChange = (label: string, value: string) => {
    setstate({ ...state, [label]: value });
  };

  const message = (
    <Message showIcon type="error" closable>
      Invalid Email or Password!!
    </Message>
  );
  const handleSubmit = async (body: { email: string; password: string }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/platform/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      console.log(data.token, "token");
      localStorage.setItem("token2", data.token);
      if (data.token) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setIsAuthenticated(false);
        toaster.push(message, { placement: "topCenter", duration: 1500 });
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };
  console.log("status after the updation", isAuthenticated);

  return (
    <div className={cx("bodyxyz")}>
      <div>
        <img
          className={cx("image")}
          src="https://img.freepik.com/free-photo/woman-writing-diary_1162-120.jpg"
          alt="login_image"
        />
      </div>

      <div className={cx("login_form")}>
        <div>
          <h3>Hello Again</h3>
        </div>
        <Form className={cx("form_login")}>
          <Form.Group controlId="email-6">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="email"
              type="email"
              placeholder="Enter email here"
              onChange={(value) => handleLoginPasswordChange("email", value)}
            />
          </Form.Group>
          <Form.Group controlId="password-6">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control
              className={cx("input_field")}
              name="password"
              type="number"
              autoComplete="off"
              placeholder="Enter password here"
              onChange={(value) => handleLoginPasswordChange("password", value)}
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
                    Login
                  </Button>
                </div>

                <p> Already have an account signup ??</p>

                <div>
                  <Button
                    className={cx("button")}
                    appearance="primary"
                    onClick={() => navigate("/signup")}
                  >
                    SignUp
                  </Button>
                </div>
              </div>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
