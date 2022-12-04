import { useRef } from "react";

export default function Doctor(props){
    let d = new Date()
    d.setFullYear(d.getFullYear()-18)

    const name = useRef("")
    const phonenumber = useRef("")
    const dob = useRef("")
    const gender = useRef("")
    const aadhdarnumber = useRef("")
    const qualification = useRef("")
    const department = useRef("")
    const exp = useRef("")

    const helperfun = (x, num) => {
      if ((x.length > 0 && x.length < num) || x.length > num) return true;
      if (x.length > 0) {
        for (let i = 0; i < num; i++) {
          if (x[i] < "0" && x[i] > "9") return true;
        }
      }
      return false;
    };

    const fun = () => {
        let flag = 0
        if(name.current.value === ""){
            flag = 1
            name.current.style["box-shadow"] = "0 0 10px red";
            name.current.style["background"] =
              "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
            name.current.focus();
            setTimeout(() => {
              name.current.style["box-shadow"] = "";
              name.current.style["background"] = "";
            }, 5000);
        }

        if (phonenumber.current.value === "") {
          flag = 1;
          phonenumber.current.style["box-shadow"] = "0 0 10px red";
          phonenumber.current.style["background"] =
            "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
          phonenumber.current.focus();
          setTimeout(() => {
            phonenumber.current.style["box-shadow"] = "";
            phonenumber.current.style["background"] = "";
          }, 5000);
        }

        if (dob.current.value === "") {
          flag = 1;
          dob.current.style["box-shadow"] = "0 0 10px red";
          dob.current.style["background"] =
            "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
          dob.current.focus();
          setTimeout(() => {
            dob.current.style["box-shadow"] = "";
            dob.current.style["background"] = "";
          }, 5000);
        }

         if (aadhdarnumber.current.value === "") {
           flag = 1;
           aadhdarnumber.current.style["box-shadow"] = "0 0 10px red";
           aadhdarnumber.current.style["background"] =
             "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
           aadhdarnumber.current.focus();
           setTimeout(() => {
             aadhdarnumber.current.style["background"] = "";
             aadhdarnumber.current.style["box-shadow"] = "";
           }, 5000);
         }

         if (gender.current.value === "") {
           flag = 1;
           gender.current.style["box-shadow"] = "0 0 10px red";
           gender.current.style["background"] =
             "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
           gender.current.focus();
           setTimeout(() => {
             gender.current.style["background"] = "";
             gender.current.style["box-shadow"] = "";
           }, 5000);
         }

         if(qualification.current.value === ""){
            flag = 1;
            qualification.current.style["box-shadow"] = "0 0 10px red";
            qualification.current.style["background"] =
              "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
            qualification.current.focus();
            setTimeout(() => {
              qualification.current.style["background"] = "";
              qualification.current.style["box-shadow"] = "";
            }, 5000);
         }

          if (department.current.value === "") {
            flag = 1;
            department.current.style["box-shadow"] = "0 0 10px red";
            department.current.style["background"] =
              "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
            department.current.focus();
            setTimeout(() => {
              department.current.style["background"] = "";
              department.current.style["box-shadow"] = "";
            }, 5000);
          }

           if (exp.current.value === "") {
             flag = 1;
             exp.current.style["box-shadow"] = "0 0 10px red";
             exp.current.style["background"] =
               "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
             exp.current.focus();
             setTimeout(() => {
               exp.current.style["background"] = "";
               exp.current.style["box-shadow"] = "";
             }, 5000);
           }



          if (helperfun(phonenumber.current.value, 10)) {
            flag = 1;
            if (phonenumber.current.value !== "") {
              phonenumber.current.style["box-shadow"] = "0 0 10px red";
              phonenumber.current.style["background"] =
                "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
              phonenumber.current.focus();
              setTimeout(() => {
                phonenumber.current.style["box-shadow"] = "";
                phonenumber.current.style["background"] = "";
              }, 5000);
            }
          }

          if (helperfun(aadhdarnumber.current.value, 12)) {
            flag = 1;
            if (aadhdarnumber.current.value !== "") {
              aadhdarnumber.current.style["box-shadow"] = "0 0 10px red";
              aadhdarnumber.current.style["background"] =
                "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
              aadhdarnumber.current.focus();
              setTimeout(() => {
                aadhdarnumber.current.style["background"] = "";
                aadhdarnumber.current.style["box-shadow"] = "";
              }, 5000);
            }
          }

          if(flag === 0){
            props.setLevel(3)
            props.setData((prevdata) => {
                let newdata = {...prevdata}
                newdata.name = name.current.value;
                newdata.aadhdarnumber = aadhdarnumber.current.value;
                newdata.phonenumber = phonenumber.current.value;
                newdata.gender = gender.current.value;
                newdata.dob = dob.current.value;
                newdata.qualification = qualification.current.value;
                newdata.department = department.current.value;
                newdata.experience = exp.current.value
                newdata.slots = []
                newdata.appointments = []
                newdata.messages = []
                newdata.timeslots = [
                  {
                    time: "09:00-09:30",
                    available: "true",
                    id: "1",
                  },
                  {
                    time: "09:30-10:00",
                    available: "false",
                    id: "2",
                  },
                  {
                    time: "10:00-10:30",
                    available: "false",
                    id: "3",
                  },
                  {
                    time: "10:30-11:00",
                    available: "false",
                    id: "4",
                  },
                  {
                    time: "11:00-11:30",
                    available: "false",
                    id: "5",
                  },
                  {
                    time: "11:30-12:00",
                    available: "false",
                    id: "6",
                  },
                  {
                    time: "18:30-19:00",
                    available: "false",
                    id: "7",
                  },
                  {
                    time: "19:00-19:30",
                    available: "false",
                    id: "8",
                  },
                  {
                    time: "19:30-20:00",
                    available: "true",
                    id: "9",
                  },
                  {
                    time: "20:00-20:30",
                    available: "false",
                    id: "10",
                  },
                  {
                    time: "20:30-21:00",
                    available: "false",
                    id: "11",
                  },
                  {
                    time: "21:00-21:30",
                    available: "false",
                    id: "12",
                  },
                  {
                    time: "21:30-22:00",
                    available: "false",
                    id: "13",
                  },
                ];
                newdata.charges = 500;
                return newdata
            })
          }
    }

    return (
      <div
        className="card-body"
        style={{ padding: "5% 5% 5% 5%", textAlign: "center" }}
      >
        <h4
          style={{
            fontFamily: "'Source Serif 4', sans-serif",
            textAlign: "center",
          }}
        >
          For postgraduate medical degree holders only
        </h4>
        <form>
          <div className="signup-log">
            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    ref={name}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    ref={phonenumber}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="bi bi-calendar-date-fill"></i>
                </div>
                <div className="col-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Name"
                    max={
                      `${d.getFullYear()}-${d.getMonth() < 10
                        ? "0"
                        : ""}${d.getMonth()}-${d.getDate().toString().length === 1 ? '0' : ''}${d.getDate()}`
                    }
                    ref={dob}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i class="bi bi-people-fill"></i>
                </div>
                <div className="col-10">
                  <select class="form-control" ref={gender}>
                    <option value="" hidden disabled selected>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="fa fa-id-card"></i>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Aadhar Number"
                    ref={aadhdarnumber}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="fa-solid fa-user-graduate"></i>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Qualification"
                    ref={qualification}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="bi bi-file-diff-fill"></i>
                </div>
                <div className="col-10">
                  <select className="form-control" ref={department}>
                    <option value="" hidden selected disabled>
                      Select Department
                    </option>
                    <option value="General physician">General physician</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Mental wellness">Mental wellness</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="ENT">ENT</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Diabetology">Diabetology</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-2">
                  <i className="fa-solid fa-book-medical"></i>
                </div>
                <div className="col-10">
                  <select className="form-control" ref={exp}>
                    <option value="" hidden selected disabled>
                      Select Experience
                    </option>
                    <option value="1y">1 Y</option>
                    <option value="2y">2 Y</option>
                    <option value="3y">3 Y</option>
                    <option value="4y">4 Y </option>
                    <option value="5y">5 Y</option>
                    <option value="6y">6 Y</option>
                    <option value="7y">7 Y</option>
                    <option value="8y">8 Y</option>
                    <option value="8y+">8+ Y</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="signup-but" style={{ paddingTop: "10%" }}>
          <button
            className="btn btn-dark btn-lg btn-block"
            onClick={() => fun()}
          >
            Next
          </button>
        </div>
      </div>
    );
}