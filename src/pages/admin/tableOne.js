import axios from "axios";
import { React, useEffect, useState } from "react";
import emailjs from "emailjs-com"

export default function TableFour() {

  function deleteQuery(id) {
    axios.get(`http://localhost:5000/admin/${id}`).then(resp => {
    console.log(resp.data);
    console.log(document.getElementById(`solution${id}`))
    resp.data.solution = document.getElementById(`solution${id}`).value
    console.log(resp.data)
    emailjs.send('service_qdk26kq', 'template_e03mhe9', resp.data, 'S3FizJZT73PoNz-yc')
      .then((result) => {
        console.log(result);
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
});
fetch(`http://localhost:5000/admin/${id}`, {
  method: "DELETE",
}).then((result) => {
  result.json().then((resp) => {
    console.log(resp);
    getQueries();
  });
});
  
  }
  let [res, setRes] = useState("default");
  useEffect(() => {
    getQueries();
  }, []);
  function getQueries() {
    axios.get("http://localhost:5000/admin").then((res) => {
      setRes(res);
    });
  }

  if (res !== "default") {
    return (
      <div className="removePatient query" id="tb1">
        <div className="q">
          <b>Queries</b>
        </div>
        <br />
        <br />
        <table className="table" id="table1">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="10%">
                query id
              </th>
              <th scope="col" width="10%">
                name
              </th>
              <th scope="col" width="15%">
                email
              </th>
              <th scope="col" width="10%">
                query
              </th>
              <th scope="col" width="10%">
                solution
              </th>
              <th scope="col" width="10%" className="table">
                verification
              </th>
            </tr>
          </thead>
          <tbody>
            {res.data.map((queri, index) => {
              return (
                <tr key={index}>
                  <td key={`1${index}`}>{queri.id}</td>
                  <td key={`2${index}`} name="namee">{queri.name}</td>
                  <td key={`3${index}`}>{queri.email}</td>
                  <td key={`4${index}`}>{queri.query}</td>
                  <td key={`5${index}`}  ><textarea id={`solution${queri.id}`} rows="4" cols="50"/></td>
                  <td key={`6${index}`}>
                    <button onClick={() => deleteQuery(queri.id)}>
                      send mail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br /> <br />
      </div>
    );
  } else {
    return <>h</>;
  }
}
