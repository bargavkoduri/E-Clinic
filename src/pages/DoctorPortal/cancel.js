import { DoctorContext } from ".";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useContext } from "react";
import Swal from "sweetalert2";

export default function Cancel(){
    const {upcoming,setUpcoming} = useContext(DoctorContext)

    const cap = (id) => {
        let temp = upcoming.filter(app => app.id !== id)
        setUpcoming(temp)
        Swal.fire({
          icon: "success",
          title: "Appointment Cancelled",
        });
    }

    return (
      <div style={{ width: "90%" }}>
        <h1
          style={{
            marginBottom: "40px",
            marginBottom: "50px",
            marginTop: "40px",
          }}
        >
          Cancel Appointments
        </h1>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Patient's Name</th>
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
                        {appointment.patient.name}
                      </p>
                    </div>
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
                      onClick={() => cap(appointment.id)}
                    >
                      Cancel
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