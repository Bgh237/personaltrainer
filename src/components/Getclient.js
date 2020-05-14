import React, { useState, useEffect } from "react";

export default function Getclient(props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  useEffect(() => {
    getClient();
  }, []);

  const getClient = () => {
    fetch(props.data.links[2].href)
      .then((response) => response.json())
      .then((response) => {
        setFirst(response.firstname);
        setLast(response.lastname);
      });
  };

  return (
    <div>
      <p>
        {first} {last}
      </p>
    </div>
  );
}
