import axios from "axios";
import { useContext, useRef } from "react";
import { UserContext } from "../../App";

export default function Profile() {
  const {data,setData} = useContext(UserContext)
  let d = new Date();
  const phonenumber = useRef()
  const aadharnumber = useRef()

  d.setFullYear(d.getFullYear() - 18);
  const handle = (e) => {
    console.log(e.target.name)
    console.log(data)
    setData({...data,[e.target.name] : e.target.value})
  }

  const validate = (x, num) => {
    if (x.length > 0 && x.length < num) return true;
    if (x.length > 0) {
      for (let i = 0; i < num; i++) {
        if (x[i] < "0" && x[i] > "9") return true;
      }
      return false;
    }
    return true;
  };

  const handlesubmit = (e) => {
    e.preventDefault()
    let tempp = validate(data.phonenumber,10)
    let tempa = validate(data.aadhdarnumber,12)
    if(tempp === true){
      phonenumber.current.focus();
      phonenumber.current.style["box-shadow"] = "0 0 10px red";
      phonenumber.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        phonenumber.current.style["box-shadow"] = "";
        phonenumber.current.style["background"] = "";
      }, 3000);
    }
    if(tempa === true){
       aadharnumber.current.focus();
       aadharnumber.current.style["box-shadow"] = "0 0 10px red";
       aadharnumber.current.style["background"] =
         "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
       setTimeout(() => {
         aadharnumber.current.style["box-shadow"] = "";
         aadharnumber.current.style["background"] = "";
       }, 3000);
    }
    if(tempa !== true && tempp !== true){
      axios.patch(`http://localhost:5000/doctors/${data.id}`, { ...data });
    }
  }

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#eee",
        height: "97vh",
        width: "100%",
      }}
    >
      <div className="row">
        <div className="col-2">
          <div
            style={{
              border: "1px solid black",
              backgroundColor: "white",
              height: "350px",
              width: "220px",
              paddingTop: "20px",
              marginTop: "40px",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px",
              borderRadius: "10px",
            }}
          >
            <div className="text-center">
              <img
                src="https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png"
                style={{ width: "150px" }}
              />
              <b>
                <p
                  style={{
                    paddingTop: "30px",
                    fontSize: "1.5rem",
                    color: "black",
                  }}
                >
                  {data.name}
                </p>
              </b>
              <p style={{ fontSize: "0.8rem", color: "black" }}>{data.dob}</p>
              <p style={{ fontSize: "0.8rem", color: "black" }}>
                {data.qualification + " , " + data.experience}
              </p>
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="container">
            <div className="row">
              <div
                className="col-10"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  height: "590px",
                  marginTop: "40px",
                  boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px",
                  paddingRight: "15px",
                  paddingLeft: "50px",
                  borderRadius: "10px",
                  marginLeft : "30px"
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "50px",
                    marginTop: "10px",
                  }}
                >
                  Info
                </h2>
                <form onSubmit={(e) => handlesubmit(e)}>
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Name
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            value={data.name}
                            name="name"
                            onChange={(e) => handle(e)}
                          ></input>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Phone Number
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            name="phonenumber"
                            value={data.phonenumber}
                            ref={phonenumber}
                            onChange={(e) => handle(e)}
                          ></input>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Aadhar Number
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            name="aadhdarnumber"
                            value={data.aadhdarnumber}
                            ref={aadharnumber}
                            onChange={(e) => handle(e)}
                          ></input>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            DOB
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={data.dob}
                            onChange={(e) => handle(e)}
                            max={`${d.getFullYear()}-${
                              d.getMonth() < 10 ? "0" : ""
                            }${d.getMonth()}-${d.getDate()}`}
                          ></input>
                        </div>
                      </div>
                      <br />
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Qualification
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            value={data.qualification}
                            name="qualification"
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Department
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            value={data.department}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Experience
                          </label>
                        </div>
                        <div className="col-8">
                          <select
                            type="text"
                            className="form-control"
                            name="experience"
                            value={data.experience}
                            onChange={(e) => handle(e)}
                          >
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
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Gender
                          </label>
                        </div>
                        <div className="col-8">
                          <select
                            className="form-control"
                            value={data.gender}
                            name="gender"
                            onChange={(e) => handle(e)}
                            style={{ fontWeight: "450" }}
                          >
                            <option value="Male">Male</option>
                            <option value="FeMale">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-block"
                    style={{
                      backgroundColor: "#655D8A",
                      width: "300px",
                      marginLeft: "30%",
                      marginTop: "5%",
                      color: "white",
                    }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
