import "./patient.css";
import React, { useEffect, useState, useContext } from "react";
import Display from "./display";
import { UserContext } from "../../App";
import axios from "axios";

export const PatientContext = React.createContext()

function Patient() {
  const [flags, setFlags] = useState({
    upflag: "patient-list  active",
    infoFlag: "patient-list",
    bkflag: "patient-list",
    capflag: "patient-list",
    papflag: "patient-list",
    msgflag: "patient-list",
  });
  const [level, setLevel] = useState("Upcoming_Appointments");
  const [width, setWidth] = useState("300px");
  const [marginLeft, setMarginLeft] = useState("340px");
  const { user,data,setData } = useContext(UserContext);
  const [upcoming, setUpcoming] = useState([]);
  const [doctor_data, setDData] = useState(null);

  function helperfun() {
    axios
      .get(`http://localhost:5000/patients?email=${user.email}`)
      .then((res) => {
        setData(res.data[0]);
      })
  }

  useEffect(() => {
    helperfun();
  }, []);

  return (
    <PatientContext.Provider value={{upcoming,setUpcoming,doctor_data,setDData}}>
      <div className="patient-navigation" style={{ width: width }}>
        <ul>
          <li className={flags.upflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list  active",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Upcoming_Appointments");
              }}
            >
              <span className="patient-icon">
                <i className="fas fa-angle-double-right fa-fw"></i>
              </span>
              <span className="patient-title">Upcoming Appointments</span>
            </div>
          </li>
          <li className={flags.infoFlag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list active",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Info");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-info fa-fw"></i>
              </span>
              <span className="patient-title">Info</span>
            </div>
          </li>
          <li className={flags.bkflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list active",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Booking");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-calendar-check fa-fw"></i>
              </span>
              <span className="patient-title">Book Appointments</span>
            </div>
          </li>
          <li className={flags.capflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list active",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Cancel_Appointment");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-calendar-check fa-fw"></i>
              </span>
              <span className="patient-title">Cancel Appointments</span>
            </div>
          </li>
          <li className={flags.papflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list active",
                  msgflag: "patient-list",
                });
                setLevel("Past_Appointment");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-clock-rotate-left fa-fw"></i>
              </span>
              <span className="patient-title">Past Appointments</span>
            </div>
          </li>
          <li className={flags.msgflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list active",
                });
                setLevel("Messages");
              }}
            >
              <span className="patient-icon">
                <i className="fas fa-envelope fa-fw"></i>
              </span>
              <span className="patient-title">Messages</span>
            </div>
          </li>
          <li className="patient-list">
            <div className="patient-list-div">
              <span className="patient-icon">
                <i className="fas fa-sign-out-alt fa-fw"></i>
              </span>
              <span className="patient-title">Logout</span>
            </div>
          </li>
        </ul>
      </div>
      <div
        style={{
          transition: "0.5s",
          marginLeft: marginLeft,
          marginTop: "20px",
        }}
      >
        <Display level={level} />
      </div>
      <div
        className="patient-toggle"
        onClick={() => {
          if (width === "300px") {
            setWidth("74px");
            setMarginLeft("110px");
          } else {
            setWidth("300px");
            setMarginLeft("340px");
          }
        }}
      >
        <i
          className="fa-solid fa-bars"
          style={{
            color: "white",
            position: "fixed",
            top: "35px",
            right: "38px",
            fontSize: "1.2rem",
          }}
        ></i>
      </div>
    </PatientContext.Provider>
  );
}

export default Patient