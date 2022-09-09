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

import { getProvinces, getCities } from "../../services/local.service";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  btn: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    width: "400px",
    color: "black",
    fontSize: "x-large",
  },
  pageHeader: {},
  controlError: {
    color: "red",
    fontSize: "medium; ",
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
}));

const defaultValues = {
  companyName: "",
  agencyName: "",
  webURL: "",
  contactPersonName: "",
  contactEmail: "",
  phoneNumber: "",
  province: "",
  city: "",
  appliedOn: undefined,
};

const Apply_To_Job = () => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // console.log(name, value);
    if (name === "province" && value === "") {
      setCities([]);
    } else if (name === "province" && value !== "") {
      setCities(getCities(value));
      formValues.city = "";
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // console.log(formValues);

      var jobAppData = {
        companyName: formValues.companyName,
        agencyName: formValues.agencyName,
        webURL: formValues.webURL,
        contactPersonName: formValues.contactPersonName,
        contactEmail: formValues.contactEmail,
        phoneNumber: formValues.phoneNumber,
        province: formValues.province,
        city: formValues.city,
        appliedOn: formValues.appliedOn,
      };
      console.log(jobAppData);
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    setProvinces(getProvinces());
  }, []);
  const renderOptionsForProvince = () => {
    return provinces.map((dt, i) => {
      return (
        <MenuItem value={dt} key={i}>
          {dt}
        </MenuItem>
      );
    });
  };
  const renderOptionsForCity = () => {
    return cities.map((dt, i) => {
      return (
        <MenuItem value={dt} key={i}>
          {dt}
        </MenuItem>
      );
    });
  };

  const findFormErrors = () => {
    const {
      companyName,
      agencyName,
      webURL,
      contactPersonName,
      contactEmail,
      phoneNumber,
      province,
      city,
      appliedOn,
    } = formValues;
    const newErrors = {};

    if (!contactPersonName || contactPersonName === "")
      newErrors.contactPersonName = "Contact-Person-Name is Required!";
    if (!contactEmail || contactEmail === "")
      newErrors.contactEmail = "Contact-Email is Required!";
    if (!province || province === "")
      newErrors.province = "Province is Required!";
    if (!city || city === "") newErrors.city = "City is Required!";
    if (!appliedOn || appliedOn === "")
      newErrors.appliedOn = "Applied On is Required!";
    return newErrors;
  };

  const [selectedDate, setSelectedDate] = useState(undefined);
  const handleDateChange = (e) => {
    console.log(e);
    let formattedDate = moment(e).format("DD/MM/YYYY");
    console.log(formattedDate);
    setSelectedDate(e);

    setFormValues({
      ...formValues,
      ["appliedOn"]: e,
    });
  };
  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Apply-Job</div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
              {!formValues.contactPersonName && errors.contactPersonName && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.contactPersonName}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
              {!formValues.contactEmail && errors.contactEmail && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.contactEmail}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <InputLabel shrink>Province</InputLabel>
              <Select
                displayEmpty
                value={formValues.province}
                name="province"
                onChange={handleInputChange}
                style={{ marginTop: 5 }}
              >
                <MenuItem value="">
                  <em>---Select Province---</em>
                </MenuItem>
                {renderOptionsForProvince()}
              </Select>
              {!formValues.province && errors.province && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.province}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <InputLabel shrink>City</InputLabel>
              <Select
                renderValue={(value) =>
                  value ? value : <em>---Select City---</em>
                }
                displayEmpty
                value={formValues.city}
                name="city"
                onChange={handleInputChange}
                style={{ marginTop: 5 }}
              >
                <MenuItem value="">
                  <em>---Select City---</em>
                </MenuItem>
                {renderOptionsForCity()}
              </Select>
              {!formValues.city && errors.city && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.city}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <InputLabel shrink>Applied On</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={formValues.appliedOn}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              {!formValues.appliedOn && errors.appliedOn && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.appliedOn}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <p></p>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.buttonPaper}>
              <Button
                className={classes.btn}
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
