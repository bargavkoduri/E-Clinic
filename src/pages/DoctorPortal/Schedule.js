import { useContext, useState } from "react";
import { DoctorContext } from ".";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function Schedule(){
    const {Schedule,setSchedule} = useContext(DoctorContext)
    const [re,setRe] = useState(0)

    const select = (id,avb) => {
       let tempsch = Schedule;
      if(avb === "false"){
          for (let i = 0; i < tempsch.length; i++) {
            if (tempsch[i].id === id) {
              tempsch[i].available = "true";
              break;
            }
          }
      }
      else{
          for (let i = 0; i < tempsch.length; i++) {
            if (tempsch[i].id === id) {
              tempsch[i].available = "false";
              break;
            }
          }
      }
       setSchedule(tempsch);
       setRe(re + 1);
    }


    return (
      <div style={{ width: "90%" }}>
        <h1 style={{ marginBottom: "40px", marginTop: "40px",marginLeft : "4%" }}>
          Scheduler Manager
        </h1>
        <div style={{paddingRight : "10%",marginLeft : "4%"}}>
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Time Slot</th>
                <th scope="col">Status</th>
                <th scope="col">Add/Delete Slot</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {Schedule.map((sch) => {
                return (
                  <tr key={sch.id}>
                    <td>
                      <div className="ms-3">
                        <p
                          className="fw-bold mb-1"
                          style={{ fontWeight: "450", color: "black" }}
                        >
                          {sch.time}
                        </p>
                      </div>
                    </td>
                    <td>
                      <p
                        className="fw-formal mb-1"
                        style={{ fontWeight: "450", color: "black" }}
                      >
                        {sch.available === "true"
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </td>
                    <td>
                      <div style={{ marginLeft: "10%" }}>
                        <button
                          className={`btn btn-${
                            sch.available === "true" ? "danger" : "success"
                          }`}
                          style={{ padding: "1%", marginLeft: "10px" }}
                          onClick={() => select(sch.id, sch.available)}
                        >
                          <i
                            className={
                              sch.available === "true"
                                ? "fa-solid fa-trash"
                                : "fa-solid fa-plus"
                            }
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    );
}