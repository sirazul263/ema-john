import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.css";
import Button from "@material-ui/core/Button";
import { useStyles } from "../Login/Login";
import { useContext } from "react";
import { UserContext } from "../../App";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const classes = useStyles();
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>

        <Link to="/review">Order Review</Link>
        <Link to="/review-inventory">Manage Inventory Here</Link>
        {loggedInUser && (
          <Button
            id="loggedOutButton"
            className={classes.root}
            color="secondary"
            style={{ fontSize: "16px", fontWeight: "700p" }}
            onClick={() => setLoggedInUser({})}
          >
            Sign out
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Header;
