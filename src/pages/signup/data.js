import { useState } from "react";
import Credential from "./credential";
import Doctor from "./doctor";
import Patient from "./patient";
import Progressbar from "./progressbar";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Data(props) {
  const [user, setUser] = useState("default");
  const [level, setLevel] = useState(0);
  const [data, setData] = useState({});

  if (user === "default") {
    return (
      <>
        <Progressbar level={level} />
        <hr style={{ marginTop: "1rem", width: "90%", marginBottom: "0rem" }} />
        <div className="signup-body-1">
          <div className="signup-log">
            <h3 style={{ fontSize: "1.75rem" }}>Select User</h3>
          </div>

          <div className="row signup-but">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-dark btn-lg"
                onClick={() => {
                  setUser("patient");
                  setLevel(1);
                }}
              >
                <i className="fas fa-user-injured "></i>Patient
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-dark btn-lg "
                onClick={() => {
                  setUser("doctor");
                  setLevel(1);
                }}
              >
                <i className="fas fa-user-md "></i>Doctor
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (level === 1 && (user === "doctor" || user === "patient")) {
    return (
      <>
        <Progressbar level={level} />
        <hr style={{ marginTop: "1rem", width: "90%", marginBottom: "0rem" }} />
        <Credential setLevel={setLevel} setData={setData} />
      </>
    );
  } else if (level === 2) {
    if (user === "doctor")
      return (
        <>
          <Progressbar level={level} />
          <hr
            style={{ marginTop: "1rem", width: "90%", marginBottom: "0rem" }}
          />
          <Doctor setLevel={setLevel} setData={setData} />
        </>
      );
    else
      return (
        <>
          <Progressbar level={level} />
          <hr
            style={{ marginTop: "1rem", width: "90%", marginBottom: "0rem" }}
          />
          <Patient setLevel={setLevel} setData={setData} />
        </>
      );
  } else if (level === 3) {
    if(user === "doctor"){
      axios.post(`http://localhost:5000/dupdoctors`, data);
    }
    else{
      axios.post(`http://localhost:5000/patients`, data);
    }
    return (
      <div style={{marginTop : "40px"}}>
        <h2>Registration successful</h2>
        <Link to="/signin">
          <h2>Click here to Login</h2>
        </Link>
      </div>
    );
  }
}
