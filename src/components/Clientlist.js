import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Addclient from "./Addclient";
import Editclient from "./Editclient";
import Addtraining from "./Addtraining";

export default function Clientlist() {
  const [client, setClients] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((response) => setClients(response.content))
      .catch((err) => console.error(err));
  };

  const deleteClient = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((_) => getClients())
        .then((_) => {
          setMsg("Client Deleted");
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const addClient = (client) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((_) => getClients())
      .then((_) => {
        setMsg("New client added");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => getClients())
      .then((_) => {
        setMsg("New training session added");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const updateClient = (link, client) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((_) => getClients())
      .then((_) => {
        setMsg("Updated Client Details");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      Header: "First name",
      accessor: "firstname",
    },
    {
      Header: "Last name",
      accessor: "lastname",
    },
    {
      Header: "Street Address",
      accessor: "streetaddress",
    },
    {
      Header: "Postcode",
      accessor: "postcode",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      accessor: "links.0.href",
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: (row) => (
        <Editclient updateClient={updateClient} client={row.original} />
      ),
    },
    {
      accessor: "links.0.href",
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: (row) => (
        <Button
          color="secondary"
          size="small"
          onClick={() => deleteClient(row.value)}
        >
          Delete
        </Button>
      ),
    },
    {
      accessor: "links.0.href",
      filterable: false,
      sortable: false,
      minWidth: 180,
      Cell: (row) => (
        <Addtraining addTraining={addTraining} training={row.original} />
      ),
    },
  ];

  return (
    <div>
      <ReactTable
        filterable={true}
        sortable={true}
        defaultPageSize={10}
        data={client}
        columns={columns}
      />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={msg}
      />
      <Addclient addClient={addClient} />
    </div>
  );
}
