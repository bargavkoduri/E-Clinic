import { PatientContext } from ".";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useContext } from "react";


export default function Cancel(){
    const {upcoming,setUpcoming,doctor_data,setDData} = useContext(PatientContext)
    const cancelapp = (id,doctor,time) => {
      let temp = upcoming.filter((app) => app.id !== id)
      let temp_doctor_data = doctor_data
      for(let i = 0;i < temp_doctor_data.length;i++){
        if(temp_doctor_data[i].id === doctor.id){
          for(let j = 0;j < temp_doctor_data[i].slots.length;j++){
            if(temp_doctor_data[i].slots[j].time === time){
              temp_doctor_data[i].slots[j].avb = true;
              break;
            }
          }
        }
      }
      setDData(temp_doctor_data)
      setUpcoming(temp)
    }
    return (
      <div style={{width : "90%"}}>
        <h1
          style={{
            marginBottom: "40px",
            marginBottom: "50px",
            marginTop: "40px",
          }}
        >Cancel Appointments</h1>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Doctor's Name</th>
              <th scope="col">Specialist</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
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
                        {appointment.doctor.name}
                      </p>
                      <p
                        className="text-muted mb-0"
                        style={{
                          fontWeight: "500",
                          color: "black",
                          fontSize: "0.9rem",
                        }}
                      >
                        {appointment.doctor.qualification}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p
                      className="fw-formal"
                      style={{ fontWeight: "450", color: "black" }}
                    >
                      {appointment.doctor.department}
                    </p>
                  </td>
                  <td>
                    <p
                      className="fw-formal"
                      style={{ fontWeight: "450", color: "black" }}
                    >
                      {appointment.date.substring(0, 10)}
                    </p>
                  </td>
                  <td>
                    <p
                      className="fw-formal"
                      style={{ fontWeight: "450", color: "black" }}
                    >
                      {appointment.time}
                    </p>
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
                  <td>
                    <button
                      type="button"
                      disabled={appointment.status === "active"}
                      className="btn btn-danger"
                      style={{ borderRadius: "10%", padding: "2%" }}
                      onClick={() =>
                        cancelapp(
                          appointment.id,
                          appointment.doctor,
                          appointment.time
                        )
                      }
                    >
                     <span style={{fontSize : "0.8rem"}}>Cancel</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
}