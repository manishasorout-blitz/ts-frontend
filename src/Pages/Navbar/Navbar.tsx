import { Link } from "react-router-dom";
import { Nav } from "rsuite";
import style from "./navbar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
const NavbarComp = (): JSX.Element => {
  return (
    <div>
      <Nav className={cx("main_nav")}>
        <div>
          <Link to="/">
            <h3>Bill Tracker</h3>
          </Link>
        </div>
        <div className={cx("right_div")}>
          <div>
            <Nav.Item>
              <Link to="/">Home</Link>
            </Nav.Item>
          </div>
          <div>
            <Nav.Item>
              <Link to="/create">Create</Link>
            </Nav.Item>
          </div>
          <div>
            <Nav.Item>
              <Link to="/login">Login</Link>
            </Nav.Item>
          </div>
        </div>
      </Nav>
    </div>
  );
};
export default NavbarComp;
