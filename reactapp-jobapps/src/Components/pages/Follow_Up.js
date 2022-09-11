import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import { getProvinces, getCities } from "../../services/local.service";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  pageHeader: {},
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
  pageTitle: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid blueviolet",
    borderRadius: "10px",
    backgroundColor: "lightseagreen",
    color: "black",
    fontSize: "x-large; ",
  },
  jobAppContainer: {
    fontSize: "medium",
    textAlign: "left",
    verticalAlign: "middle",
    border: "2px solid blue",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    paddingLeft: "10px",
  },
}));

const defaultValues = {
  contactPersonName: "",
  province: "",
  city: "",
  appliedOn: null,
};

const Follow_Up = () => {
  const classes = useStyles();

  const [jobApps, setJobApps] = useState([]);

  const getAllJobApps = () => {
    JobApplicationService.getAllJobApps()
      .then((response) => {
        console.log(response.data);
        setJobApps(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllJobApps();
  }, []);

  let jobAppsList =
    jobApps.length > 0 &&
    jobApps.map((item, i) => {
      return (
        <div key={i}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={10}>
              <div className={classes.jobAppContainer}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <div>Contact Name : {item.contactPersonName}</div>
                    <div>Contact Email : {item.contactEmail}</div>
                    <div>
                      Phone : {item.phoneNumber ? item.phoneNumber : "N/A"}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      Company : {item.companyName ? item.companyName : "N/A"}
                    </div>
                    <div>
                      Agency : {item.agencyName ? item.agencyName : "N/A"}
                    </div>
                    <div>URL : {item.webURL ? item.webURL : "N/A"}</div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
        </div>
      );
    }, this);

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={3}>
        <Grid item xs>
          <div style={{ background: "red" }}> A</div>
        </Grid>
        <Grid item xs={7}>
          <div style={{ background: "green" }}> B </div>
        </Grid>
        <Grid item xs>
          <div style={{ background: "blue" }}> C </div>
        </Grid>
        <Grid item xs>
          <div style={{ background: "green" }}> D </div>
        </Grid>
      </Grid>
      <p></p>
      <hr />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Follow-Up</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div>{jobAppsList}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Follow_Up;
