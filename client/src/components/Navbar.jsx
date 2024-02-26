import React from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="Search ..." />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <a href="/create-listing">Become A Host</a>
        ) : (
          <a href="/login">Become A Host</a>
        )}
        <button className="navbar_right_account">
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`/${user.profileImagePath.replace("public", "")}`}
              alt="profile pic"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
