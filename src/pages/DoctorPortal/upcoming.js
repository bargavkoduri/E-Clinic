import { useContext, useEffect } from "react";
import { DoctorContext } from "./index";
import { UserContext } from "../../App";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function Upcoming(){
    const {upcoming} = useContext(DoctorContext)
    let {data} = useContext(UserContext)

    if(data.appointments !== undefined){
        return (
          <div style={{width : "90%"}}>
            <h1 style={{ marginBottom: "50px",marginTop : "40px" }}>
              Hey {data.name} ,Welcome Back!
            </h1>
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">Patient's Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {upcoming.map((appointment) => {
                  return (
                    <tr key={appointment.id}>
                      <td>
                        <div className="ms-3">
                          <p
                            className="fw-bold mb-1"
                            style={{ fontWeight: "600", color: "black" }}
                          >
                            {appointment.patient.name}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p
                          className="fw-formal mb-1"
                          style={{ fontWeight: "450", color: "black" }}
                        >
                          {appointment.date.substring(0, 10)}
                        </p>
                      </td>
                      <td>
                        <p
                          className="fw-formal mb-1"
                          style={{ fontWeight: "450", color: "black" }}
                        >
                          {appointment.time}
                        </p>
                      </td>
                      <td>
                        <MDBBadge
                          color={
                            appointment.status === "active"
                              ? "success"
                              : "warning"
                          }
                          pill
                        >
                          {appointment.status}
                        </MDBBadge>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </div>
        );
    }
}