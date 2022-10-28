import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PatientContext } from ".";
import Upcoming from "./upcoming";

const Book = () => {
  const [slot, setSlot] = useState(0);
  const [enable, setEnable] = useState([]);
  const [re,setV] = useState(0)
  const { doctor_data, setDData,setUpcoming } = useContext(PatientContext);
  const shoot = (b) => {
    let alt = Array(doctor_data.length).fill(0);
    alt[b.target.value - 1] = 1;
    setSlot(b.target.innerText);

    setEnable(alt);
  };
  const book = (b) => {
    let data1 = doctor_data;
    for (let i in data1) {
      let jj = data1[i];

      if (jj.id == b.target.id) {
        for (let j in jj.slots) {
          if (jj.slots[j].time == slot) {
            jj.slots[j].avb = false;
            setUpcoming((prev) => {
                let li = prev
                li.push({
                  date: new Date().toISOString(),
                  time: slot,
                  doctor: {
                    name: data1[i].name,
                    qualification: data1[i].qualification,
                    department: data1[i].department,
                  },
                  status: "upcoming",
                  id: Math.floor(Math.random() * 10000) + 1
                });
                return li
            })
          }
        }
      }
    }
    setDData(data1)
    setV(re+1)
  };
  useEffect(() => {
   if(doctor_data === null){
     axios.get("http://localhost:5000/doctors").then((resp) => {
       setDData(resp.data);
       setEnable(Array(resp.data.length).fill(0));
     });
   }
   else{
      setEnable(Array(doctor_data.length).fill(0))
   }
  },[doctor_data])

  if(doctor_data !== null && enable.length === doctor_data.length){
    return (
      <div className="booking" id="booking">
        <h1> Book Doctor Now! </h1>

        <br />
        <br />
        <input
          className="form-control"
          id="Input2"
          type="text"
          placeholder="Search.."
        />
        <br />
        <div className="tab1">
          <div>
            {doctor_data.map((item) => (
              <div
                style={{
                  borderStyle: "outset",
                  borderWidth: "5px",
                  margin: "10px",
                }}
                id={item.id}
              >
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-3">
                    <img
                      id="im"
                      style={{ width: "150px", padding: "10px" }}
                      src={
                        "https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png"
                      }
                    />
                  </div>
                  <div
                    className="col-4"
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      lineHeight: "30px",
                    }}
                  >
                    <h3 style={{ paddingRight: "10px" }}>
                      {item.name}({item.Gender})
                    </h3>
                    <h5>
                      {item.qualification},{item.department}
                    </h5>
                    <span>{item.experience}+ yrs Experience</span>
                    <br />
                    <span>₹ {item.charges}/- per session </span>
                  </div>
                  <div
                    className="col"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    <h5>
                      {new Date().toLocaleString("en", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </h5>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      {item.slots
                        .filter((el) => {
                          return el.avb === true;
                        })
                        .map((t) => (
                          <button
                            type="button"
                            style={{ margin: "5px" }}
                            className="btn btn-outline-success btn-small "
                            value={item.id}
                            onClick={(event) => shoot(event)}
                          >
                            {t.time}
                          </button>
                        ))}
                    </div>
                    <button
                      type="button"
                      id={item.id}
                      className="btn btn-secondary btn-lg btn-block"
                      disabled={enable[item.id - 1] == 0}
                      onClick={(event) => book(event)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Book;