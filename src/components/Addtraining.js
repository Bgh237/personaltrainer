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

export default function Addtraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: new Date(),
    activity: "",
    duration: "",
    customer: props.training.links[0].href,
  });

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setTraining({ ...training, date: date });
  };

  const handleSave = () => {
    props.addTraining(training);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add Training Session
      </Button>
      <Dialog
        open={open}
        onClose={handleSave}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add New Training Session for {props.training.firstname}{" "}
          {props.training.lastname}
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              format="dd/MM/yyyy"
              label="Date"
              value={training.date}
              onChange={(date) => handleDateChange(date)}
            />
            <KeyboardTimePicker
              // margin="normal"
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
