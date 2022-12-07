import axios from "axios";
import { React, useEffect, useState } from "react";
export default function TableTwo() {
  function acceptDoctor(id) {
    fetch(`http://localhost:5000/dupdoctors/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getDoctors();
      });
    });

    fetch(`http://localhost:5000/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(res.data.find((item) => item.id === id)),
    }).then(() => {
      console.log("added");
      console.log(res.data.find((item) => item.id === id));
    });
  }

  let [res, setRes] = useState("default");
  useEffect(() => {
    getDoctors();
  }, []);
  function getDoctors() {
    axios.get("http://localhost:5000/dupdoctors").then((res) => {
      setRes(res);
    });
  }

  if (res !== "default") {
    return (
      <div className="accept" id="tb2">
        <div className="acc">
          <b>Verify doctor</b>
        </div>
        <br />
        <br />

        <table className="table">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="10%">
                doctor id
              </th>
              <th scope="col" width="10%">
                name
              </th>
              <th scope="col" width="10%">
                email
              </th>
              <th scope="col" width="20%">
                qualification
              </th>
              <th scope="col" width="20%">
                department
              </th>
              <th scope="col" width="20%">
                Accept Doctor
              </th>
            </tr>
          </thead>
          <tbody>
            {res.data.map((doctor, index) => {
              return (
                <tr key={index}>
                  <td key={`1${index}`}>{doctor.id}</td>
                  <td key={`2${index}`}>{doctor.name}</td>
                  <td key={`3${index}`}>{doctor.email}</td>
                  <td key={`4${index}`}>{doctor.qualification}</td>
                  <td key={`5${index}`}>{doctor.department}</td>
                  <td key={`6${index}`}>
                    <button onClick={() => acceptDoctor(doctor.id)}>
                      Accept Doctor
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <>h</>;
  }
}
