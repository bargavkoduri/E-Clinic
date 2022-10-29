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
          <>
            <h1 style={{ marginBottom: "40px" }}>
              Hey {data.name} ,Welcome Back!
            </h1>
            <MDBTable align="middle" style={{ position: "" }}>
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
                          <p className="fw-bold mb-1">
                            {appointment.patient.name}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="fw-formal mb-1">
                          {appointment.date.substring(0, 10)}
                        </p>
                      </td>
                      <td>
                        <p className="fw-formal mb-1">{appointment.time}</p>
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
          </>
        );
    }
}