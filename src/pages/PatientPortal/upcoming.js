import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {PatientContext} from "./index"
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function Upcoming() {
  const {upcoming} = useContext(PatientContext)
  let {data} = useContext(UserContext)

  if(data.appointments !== undefined){
      return (
        <>
        <h1 style={{marginBottom : "40px"}}>Hey {data.name} ,Welcome Back!</h1>
        <MDBTable align="middle" style={{position : ""}}>
          <MDBTableHead>
            <tr>
              <th scope="col">Doctor's Name</th>
              <th scope="col">Specialist</th>
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
                      <p className="fw-bold mb-1">{appointment.doctor.name}</p>
                      <p className="text-muted mb-0">
                        {appointment.doctor.qualification}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="fw-formal mb-1">
                      {appointment.doctor.department}
                    </p>
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
                        appointment.status === "active" ? "success" : "warning"
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
  else{
    return <></>
  }
}
