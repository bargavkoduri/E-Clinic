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
  const {upcoming, setUpcoming} = useContext(PatientContext)
  let {data} = useContext(UserContext)
  useEffect(() => {
    if(data.appointments !== undefined && upcoming === []){
      let initial_list = data.appointments;
      let final_list = [];
      let d = new Date();
      let td =
        d.getFullYear() +
        "-" +
        (((d.getMonth()+1).toString().length === 1 ? "0" : "") +
          (d.getMonth() + 1).toString()) +
        "-" +
        d.getDate();
      let temptime = d.getHours() + ":" + d.getMinutes();
      temptime = (temptime.length === 4 ? "0" : "") + temptime;
      //console.log(temptime+" "+td)
      for (let i = 0; i < initial_list.length; i++) {
        let tempdate = initial_list[i].date.substring(0, 10);
        //console.log(tempdate)
        if (tempdate >= td) {
            if (
               temptime > initial_list[i].time.substring(0, 5) &&
             initial_list[i].time.substring(6, 11) > temptime
            ){
              final_list.push({
                ...initial_list[i],
                status: "active",
                id: final_list.length + 1,
              });
            }
            else if (initial_list[i].time.substring(0, 5) > temptime) {
              final_list.push({
                ...initial_list[i],
                status: "upcoming",
                id: final_list.length + 1,
              });
            }
        }
      }
      setUpcoming(final_list);
    }
  }, []);

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
