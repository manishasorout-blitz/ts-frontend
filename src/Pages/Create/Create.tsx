import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, ButtonToolbar, Button, Content } from "rsuite";
import "../../styles.css";
import style from "./create.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
interface createnewBill {
  title: string;
  amount: number;
  expense_date: string;
}
const CreateNewBill = (): JSX.Element => {
  const [state, setstate] = React.useState<createnewBill>({
    title: "",
    amount: 0,
    expense_date: "",
  });

  const handleChangeCreateBill = (label: string, value: string) => {
    const newValue =
      state[label as keyof createnewBill] === 0 ? parseInt(value) : value;
    setstate({ ...state, [label]: newValue });
  };
  const navigate = useNavigate();
  console.log(state, "state");
  const handleSubmit = async (body: {}) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/platform/bill/createbills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token2"),
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("body")}>
      <Form layout="horizontal">
        <Form.Group controlId="name-6">
          <Form.Control
            name="first_name"
            placeholder="Enter title of bill "
            onChange={(value: string) => handleChangeCreateBill("title", value)}
          />
        </Form.Group>
        <Form.Group controlId="name-6">
          <Form.Control
            name="last_name"
            placeholder="Enter amount"
            type="number"
            onChange={(value: string) =>
              handleChangeCreateBill("amount", value)
            }
          />
        </Form.Group>
        <Form.Group controlId="email-6">
          <Form.Control
            name="email"
            type="date"
            onChange={(value: string) =>
              handleChangeCreateBill("expense_date", value)
            }
          />
        </Form.Group>

        <Form.Group>
          <ButtonToolbar>
            <Button
              className={cx("button")}
              appearance="primary"
              onClick={() => handleSubmit(state)}
            >
              Create New User
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateNewBill;
