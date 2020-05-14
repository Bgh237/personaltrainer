import React, { useState, useEffect } from "react";
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

export default function Edittraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: new Date(),
    activity: "",
    duration: "",
    customer: props.training.links[2].href,
  });
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [name, setName] = useState({ first: "", last: "" });

  const getClients = () => {
    //console.log(props.client.href);
    fetch(props.client.href)
      .then((response) => response.json())
      .then((response) => {
        setFirst(response.firstname);
        setLast(response.lastname);
        setName({ ...name, first: response.firstname });
      })
      .catch((err) => console.error(err));
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    getClients();
    console.log(props);
    console.log(props.client.href);
    //console.log(client.firstname);
    setTraining({
      date: props.training.date,
      activity: props.training.activity,
      duration: props.training.duration,
    });
    setOpen(true);
  };
  const handleEdit = () => {
    props.updateTraining(props.training.links[0].href, training);
    setTraining({
      date: new Date(),
      activity: "",
      duration: "",
      customer: props.training.links[0].href,
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setTraining({ ...training, date: date });
  };

  /*const handleSave = () => {
    props.addTraining(training);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
    setOpen(false);
  };*/

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit Training Session for {first} {last}
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
              margin="normal"
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
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
