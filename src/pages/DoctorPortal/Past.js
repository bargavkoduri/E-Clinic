import { useContext } from "react";
import { DoctorContext } from ".";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function Past(){
    const {past} = useContext(DoctorContext)
     return (
       <div style={{ width: "90%" }}>
         <h1 style={{ marginTop: "30px", marginBottom: "40px" }}>Past Appointments</h1>
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
             {past.map((appointment) => {
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
                       color="secondary"
                       pill
                       style={{ width: "40%", height: "18px" }}
                     >
                       <span style={{ color: "white" }}>
                         {appointment.status}
                       </span>
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