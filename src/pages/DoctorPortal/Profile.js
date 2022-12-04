import axios from "axios";
import { useContext, useRef,useState } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";

export default function Profile() {
  const {data,setData} = useContext(UserContext)
  let d = new Date();
  const phonenumber = useRef()
  const aadharnumber = useRef()
  const password = useRef()
  const name = useRef()
  const charges = useRef()
  const [view, setView] = useState("");

  d.setFullYear(d.getFullYear() - 18);
  const handle = (e) => {
    console.log(e.target.name)
    console.log(data)
    setData({...data,[e.target.name] : e.target.value})
  }

  const validateName = (name1) => {
    name1 = name1.replace(/ /g, "");
    console.log(name1);
    if (name1.length >= 1) {
      return false;
    }
    return true;
  };


  const validate = (x, num) => {
    if ( (x.length > 0 && x.length < num) || x.length > num) return true;
    if (x.length > 0) {
      for (let i = 0; i < num; i++) {
        if (x[i] < "0" && x[i] > "9") return true;
      }
      return false;
    }
    return true;
  };

  const showPass = () => {
    if (view === "") {
      setView("-slash");
      password.current.type = "text";
    } else {
      setView("");
      password.current.type = "password";
    }
  };

   function validateFee(fee1) {
     for (let i = 0; i < fee1.length; i++) {
       if (fee1[i] < "1" && fee1[i] > "9") return true;
       return false;
     }
   }


  function ValidatePassword(x) {
    if (x.length >= 8) {
      let bigchar = 0;
      let smallchar = 0;
      let numeric = 0;
      for (let i = 0; i < x.length; i++) {
        if (x[i] >= "0" && x[i] <= "9") numeric += 1;
        else if (x[i] >= "a" && x[i] <= "z") smallchar += 1;
        else if (x[i] >= "A" && x[i] <= "Z") bigchar += 1;
      }
      if (bigchar >= 1 && smallchar >= 1 && numeric >= 1) return true;
      else {
        password.current.focus();
        password.current.style["box-shadow"] = "0 0 10px red";
        setTimeout(() => {
          password.current.style["box-shadow"] = "";
        }, 5000);
        return false;
      }
    }
    password.current.focus();
    password.current.style["box-shadow"] = "0 0 10px red";
    setTimeout(() => {
      password.current.style["box-shadow"] = "";
    }, 3000);
    return false;
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    let tempp = validate(data.phonenumber,10)
    let tempa = validate(data.aadhdarnumber,12)
    let temppass = ValidatePassword(data.password)
    let tempname = validateName(data.name)
    let tempcharges = validateFee(data.charges)
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
    if (tempname === true) {
      name.current.focus();
      name.current.style["box-shadow"] = "0 0 10px red";
      name.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        name.current.style["box-shadow"] = "";
        name.current.style["background"] = "";
      }, 3000);
    }
    if(tempcharges === true) {
      charges.current.focus();
      charges.current.style["box-shadow"] = "0 0 10px red";
      charges.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        charges.current.style["box-shadow"] = "";
        charges.current.style["background"] = "";
      }, 3000);
    }
    if(tempa !== true && tempp !== true && temppass === true && tempname !== true && tempcharges !== true){
      axios.patch(`http://localhost:5000/doctors/${data.id}`, { ...data }).then(resp => {
        if(resp.status === 200){
          Swal.fire({
            icon: "success",
            title: "Info updated successfully",
          });
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Unable to update info",
          });
          window.location.reload(false)
        }
      }
      )
    }
  }

  return (
    <div
      className="container-fluid"
      style={{
        // backgroundColor: "#eee",
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
              height: "370px",
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
                  height: "650px",
                  marginTop: "40px",
                  boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px",
                  paddingRight: "15px",
                  paddingLeft: "50px",
                  borderRadius: "10px",
                  marginLeft: "30px",
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
                            ref={name}
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
                            }${d.getMonth()}-${
                              d.getDate().toString().length === 1 ? "0" : ""
                            }${d.getDate()}`}
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
                            Password
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={data.password}
                            ref={password}
                            onChange={(e) => handle(e)}
                          ></input>
                        </div>
                        <div onClick={() => showPass()}>
                          <i
                            className={`fa-solid fa-eye${view} input-icons-i`}
                            style={{
                              position: "absolute",
                              top: "87%",
                              right: "14%",
                            }}
                          ></i>
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
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-3">
                          <label
                            className="col-form-label"
                            style={{ fontWeight: "450" }}
                          >
                            Charges
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            className="form-control"
                            value={data.charges}
                            name="charges"
                            onChange={(e) => handle(e)}
                            style={{ fontWeight: "450" }}
                            ref={charges}
                          />
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
