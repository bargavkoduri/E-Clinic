import { useContext, useEffect } from "react";
import { PatientContext } from ".";
import { UserContext } from "../../App";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";


export default function Past(){
    const {past,setPast} = useContext(PatientContext)
    const {data} = useContext(UserContext)
    useEffect(() => {
        if(past.length === 0){
            let initial_list = data.appointments
             let final_list = [];
             let d = new Date();
             let td =
               d.getFullYear() +
               "-" +
               (((d.getMonth() + 1).toString().length === 1 ? "0" : "") +
                 (d.getMonth() + 1).toString()) +
               "-" +
               d.getDate();
             let temptime = d.getHours() + ":" + d.getMinutes();
             temptime = (temptime.length === 4 ? "0" : "") + temptime;
             //console.log(temptime+" "+td)
             for (let i = 0; i < initial_list.length; i++) {
               let tempdate = initial_list[i].date.substring(0, 10);
               //console.log(tempdate)
               if (td === tempdate) {
                //  if (
                //    temptime > initial_list[i].time.substring(0, 5) &&
                //    initial_list[i].time.substring(6, 11) > temptime
                //  ) {
                //    final_list.push({
                //      ...initial_list[i],
                //      status: "active",
                //      id: final_list.length + 1,
                //    });
                //  } else if (initial_list[i].time.substring(0, 5) > temptime) {
                //    final_list.push({
                //      ...initial_list[i],
                //      status: "upcoming",
                //      id: final_list.length + 1,
                //    });
                //  }
                console.log("yes")
                console.log(temptime)
                console.log(initial_list[i].time.substring(6,11))
                if(temptime > initial_list[i].time.substring(6,11)){
                    final_list.push({
                        ...initial_list[i],
                        status : "past",
                        id : final_list.length + 1
                    })
                }
               }
               else if(td > tempdate){
                final_list.push({
                  ...initial_list[i],
                  status: "past",
                  id: final_list.length + 1,
                });
               }
             }
             setPast(final_list)
        }
    },[])

    return (
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
            {past.map((appointment) => {
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
    )
}