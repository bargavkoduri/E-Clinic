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
  const password1 = useRef();
  const name = useRef()
  const charges = useRef()
  const [view, setView] = useState("");
  const [view1, setView1] = useState(""); 

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

  function ValidatePassword(x, pass) {
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
        pass.current.focus();
        pass.current.style["box-shadow"] = "0 0 10px red";
        setTimeout(() => {
          pass.current.style["box-shadow"] = "";
        }, 3000);
        return false;
      }
    }
    pass.current.focus();
    pass.current.style["box-shadow"] = "0 0 10px red";
    setTimeout(() => {
      pass.current.style["box-shadow"] = "";
    }, 3000);
    return false;
  }



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

  const showPass1 = () => {
    if (view1 === "") {
      setView1("-slash");
      password1.current.type = "text";
    } else {
      setView1("");
      password1.current.type = "password";
    }
  };

   function validateFee(fee1) {
    if(fee1.length === 0)
      return true
     for (let i = 0; i < fee1.length; i++) {
       if (fee1[i] < "1" && fee1[i] > "9") return true;
       return false;
     }
   }

  const handlesubmit = (e) => {
    e.preventDefault()
    let tempp = validate(data.phonenumber,10)
    let tempa = validate(data.aadhdarnumber,12)
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
    if(tempa !== true && tempp !== true && tempname !== true && tempcharges !== true){
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

  const submithandler1 = () => {
    if (
      ValidatePassword(password.current.value, password) &&
      ValidatePassword(password1.current.value, password1) &&
      password.current.value === data.password
    ) {
      axios
        .patch(`http://localhost:5000/doctors/${data.id}`, {
          password: password1.current.value,
        })
        .then(() => {
          password.current.value = "";
          password1.current.value = "";
          Swal.fire({
            icon: "success",
            title: "Password updated successfully",
          });
          window.location.reload(false);
        });
    } else if (
      ValidatePassword(password.current.value, password) &&
      ValidatePassword(password1.current.value, password1)
    ) {
      Swal.fire({
        icon: "error",
        title: "Current Password doesn't match",
      });
    }
  };

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
                  height: "550px",
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

     <div className="row">
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "white",
            height: "260px",
            width : "88%",
            display: "inline-block",
            marginRight: "0px",
            paddingTop: "20px",
            marginBottom: "50px",
            marginTop: "40px",
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px",
            borderRadius: "10px",
          }}
        >
          <h2>Update Password</h2>
          <br />
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col-2" style={{ marginLeft: "20px" }}>
              <label className="col-form-label" style={{ fontWeight: "450" }}>
                Current Password
              </label>
            </div>
            <div className="col-3">
              <input
                className="form-control"
                ref={password}
                name="password"
                type="password"
              ></input>
              <div onClick={() => showPass()}>
                <i
                  className={`fa-solid fa-eye${view} input-icons-i`}
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "7%",
                  }}
                ></i>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-2">
              <label className="col-form-label" style={{ fontWeight: "450" }}>
                New Password
              </label>
            </div>
            <div className="col-3">
              <input
                className="form-control"
                ref={password1}
                type="password"
              ></input>
              <div onClick={() => showPass1()}>
                <i
                  className={`fa-solid fa-eye${view1} input-icons-i`}
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "7%",
                  }}
                ></i>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-block"
            style={{
              backgroundColor: "#655D8A",
              width: "300px",
              marginLeft: "39%",
              marginTop : "4%",
              color: "white",
            }}
            onClick = {() => submithandler1()}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
