import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Addclient(props) {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const inputChanged = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addClient(client);
    setClient({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add new Client
      </Button>
      <Dialog
        open={open}
        onClose={handleSave}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            name="firstname"
            value={client.firstname}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            name="lastname"
            value={client.lastname}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Street Address"
            name="streetaddress"
            value={client.streetaddress}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Postcode"
            name="postcode"
            value={client.postcode}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="City"
            name="city"
            value={client.city}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            name="email"
            value={client.email}
            onChange={(e) => inputChanged(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            name="phone"
            value={client.phone}
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
