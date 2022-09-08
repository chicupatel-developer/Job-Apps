import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myButton: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    width: "400px",
    color: "black",
    fontSize: "x-large",
  },
  pageHeader: {
    margin: "50px",
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
  buttonPaper: {
    textAlign: "center",
  },
}));

const defaultValues = {
  companyName: "",
  agencyName: "",
  webURL: "",
  contactPersonName: "",
  contactEmail: "",
  phoneNumber: "",
  os: "",
};

function GridItem({ classes }) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={12} sm={6} md={6}>
      <Paper className={classes.paper}>item</Paper>
    </Grid>
  );
}

const Apply_To_Job = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <div className={classes.pageHeader}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <TextField
                id="companyName-input"
                name="companyName"
                label="Company-Name"
                type="text"
                value={formValues.companyName}
                onChange={handleInputChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              {" "}
              <TextField
                id="agencyName-input"
                name="agencyName"
                label="Agency-Name"
                type="text"
                value={formValues.agencyName}
                onChange={handleInputChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <TextField
                id="webURL-input"
                name="webURL"
                label="Web-URL"
                type="text"
                value={formValues.webURL}
                onChange={handleInputChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              {" "}
              <TextField
                id="contactPersonName-input"
                name="contactPersonName"
                label="Contact-Person"
                type="text"
                value={formValues.contactPersonName}
                onChange={handleInputChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              {" "}
              <TextField
                id="contactEmail-input"
                name="contactEmail"
                label="Contact-Email"
                type="text"
                value={formValues.contactEmail}
                onChange={handleInputChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              {" "}
              <TextField
                id="phoneNumber-input"
                name="phoneNumber"
                label="Phone-Number"
                type="text"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl>
              <Select
                name="os"
                value={formValues.os}
                onChange={handleInputChange}
              >
                <MenuItem key="mac" value="mac">
                  Mac
                </MenuItem>
                <MenuItem key="windows" value="windows">
                  Windows
                </MenuItem>
                <MenuItem key="linux " value="linux">
                  Linux
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <p></p>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.buttonPaper}>
              <Button
                className={classes.myButton}
                variant="contained"
                color="primary"
                type="submit"
              >
                Apply Now!
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Apply_To_Job;
