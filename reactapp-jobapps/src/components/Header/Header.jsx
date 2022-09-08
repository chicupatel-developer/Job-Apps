import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>React Material UI Example</Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
