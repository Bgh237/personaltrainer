import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import Moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Addtraining2(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: new Date(),
    activity: "",
    duration: "",
    customer: "",
  });
  const [menuOpen, setMenuOpen] = useState(false); //specifically for the client menu in the pop up box

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    //opens the pop-up add training
    setOpen(true);
  };

  const handleCancel = () => {
    //cancels adding new training
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setTraining({ ...training, date: date });
  };

  const handleMenuOpen = () => {
    //opens the client menu
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    setTraining({
      date: new Date(),
      //date: "",
      activity: "",
      duration: "",
      customer: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add New Training Session
      </Button>
      <Dialog
        open={open}
        onClose={handleSave}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              format="dd/MM/yyyy"
              label="Date"
              value={training.date}
              onChange={(date) => handleDateChange(date)}
            />
            <KeyboardTimePicker
              //margin="normal"
              id="time-picker"
              label="Time"
              value={training.date}
              onChange={(date) => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Duration"
            name="duration"
            value={training.duration}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Client
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={menuOpen}
              onClose={handleMenuClose}
              onOpen={handleMenuOpen}
              name="customer"
              value={training.customer}
              onChange={(e) => inputChanged(e)}
            >
              {/*the following code takes the client object and returns the first name and surname in a list for the user to select an existing client. The value is the link to the customer as per the api documentation*/}
              {props.client.map((client, index) => (
                <MenuItem key={index} value={client.links[0].href}>
                  {client.firstname} {client.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
