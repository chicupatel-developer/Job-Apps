import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginTop: "100px",
  },
}));

const Home = () => {
  const classes = useStyles();

  return <div className={classes.pageHeader}>home</div>;
};

export default Home;
