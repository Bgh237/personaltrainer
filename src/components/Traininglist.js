import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Getclient from "./Getclient";
import Moment from "moment";
import "moment/locale/fi";
import AddtrainingA from "./AddtrainingA";
import Edittraining from "./Edittraining";
import matchSorter from "match-sorter";

export default function Traininglist() {
  const [training, setTraining] = useState([]);
  const [client, setClients] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState([]);

  //Try for each training fetch href for customer and add name to training array
  useEffect(() => {
    getTraining();
    getClients();
    //
    getName();
  }, []);

  const getTraining = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((response) => setTraining(response.content))
      .catch((err) => console.error(err));
  };
  const getName = () => {
    console.log(training);
    /*for(var x = 0; x < training.length; x++) {
      fetch(training[i].)
    }*/
  };

  const getClients = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((response) => {
        setClients(response.content);
        setName(response.content.firstname + " " + response.content.lastname);
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => getTraining())
      .then((_) => {
        setMsg("New training session added");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((_) => getTraining())
        .then((_) => {
          setMsg("Training Session Deleted");
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const updateTraining = (link, training) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => getTraining())
      .then((_) => {
        setMsg("Updated Training Session");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      Header: "Date",
      accessor: "date",
      Cell: (row) => Moment(row.original.date).format("DD.MM.YYYY HH:mm"),
      filterMethod: (filter, rows) => rows.date.includes(filter.value),
    },
    {
      Header: "Activity",
      accessor: "activity",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Customer",
      accessor: "customer",
      Cell: (row) => <Getclient data={row.original} />,
      filterable: true,
    },
    {
      accessor: "links.0.href",
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: (row) => (
        <Edittraining
          updateTraining={updateTraining}
          training={row.original}
          client={row.original.links[2]}
        />
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
          onClick={() => deleteTraining(row.value)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <ReactTable
        filterable={true}
        sortable={true}
        defaultPageSize={10}
        data={training}
        columns={columns}
      />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={msg}
      />
      <AddtrainingA
        addTraining={addTraining}
        client={client}
        training={training}
      />
    </div>
  );
}
