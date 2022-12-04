import axios from "axios";
import { useContext, useRef,useState } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";

export default function Profile() {
  const { data, setData } = useContext(UserContext);
  const [view, setView] = useState("");
    const aadharnumber = useRef();
    const phonenumber = useRef();
    const password = useRef();
    const name = useRef();

  const handler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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

  const validateName = (name1) => {
    name1 = name1.replace(/ /g, "");
    if (name1.length >= 1) {
      return false;
    }
    return true;
  };


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
    }, 5000);
    return false;
  }

   const showPass = () => {
     if (view === "") {
       setView("-slash");
       password.current.type = "text";
     } else {
       setView("");
       password.current.type = "password";
     }
   };


  const submithandler = (e) => {
    e.preventDefault();
    let tempp = validate(data.phonenumber, 10);
    let tempa = validate(data.aadhdarnumber, 12);
    let temppass = ValidatePassword(data.password);
    let tempname = validateName(data.name)
    if (tempp === true) {
      phonenumber.current.focus();
      phonenumber.current.style["box-shadow"] = "0 0 10px red";
      phonenumber.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        phonenumber.current.style["box-shadow"] = "";
        phonenumber.current.style["background"] = "";
      }, 3000);
    }
    if (tempa === true) {
      aadharnumber.current.focus();
      aadharnumber.current.style["box-shadow"] = "0 0 10px red";
      aadharnumber.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        aadharnumber.current.style["box-shadow"] = "";
        aadharnumber.current.style["background"] = "";
      }, 3000);
    }
    if(tempname === true){
      name.current.focus();
      name.current.style["box-shadow"] = "0 0 10px red";
      name.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        name.current.style["box-shadow"] = "";
        name.current.style["background"] = "";
      }, 3000);
    }
    if (tempa !== true && tempp !== true &&  temppass === true && tempname !== true) {
      axios.patch(`http://localhost:5000/patients/${data.id}`, { ...data }).then(resp => {
        if (resp.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Info updated successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unable to update info",
          });
          window.location.reload(false);
        }
      })
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
            // className="container"
            style={{
              border: "1px solid black",
              backgroundColor: "white",
              height: "350px",
              width: "220px",
              display: "inline-block",
              marginRight: "0px",
              paddingTop: "20px",
              marginTop: "40px",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px",
              borderRadius: "10px",
            }}
          >
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
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
              <p style={{ fontSize: "0.8rem", color: "black" }}>{data.email}</p>
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
                  paddingRight: "30px",
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
                <form onSubmit={(e) => submithandler(e)}>
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
                            onChange={(e) => handler(e)}
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
                            Phone Number
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            name="phonenumber"
                            value={data.phonenumber}
                            onChange={(e) => handler(e)}
                            ref={phonenumber}
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
                            onChange={(e) => handler(e)}
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
                            value={data.dob}
                            name="dob"
                            className="form-control"
                            onChange={(e) => handler(e)}
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
                            Gender
                          </label>
                        </div>
                        <div className="col-8">
                          <select
                            className="form-control"
                            value={data.gender}
                            name="gender"
                            onChange={(e) => handler(e)}
                          >
                            <option value="Male">Male</option>
                            <option value="FeMale">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <label style={{ fontWeight: "450" }}>Allergies</label>
                        <textarea
                          className="form-control"
                          style={{ height: "95px", width: "550px" }}
                          value={data.allergies}
                          name="allergies"
                          onChange={(e) => handler(e)}
                        ></textarea>
                      </div>
                      <br />
                      <div className="row">
                        <label style={{ fontWeight: "450" }}>
                          Past Medical History
                        </label>
                        <textarea
                          className="form-control"
                          style={{ height: "95px", width: "550px" }}
                          value={data.past_medical_history}
                          name="past_medical_history"
                          onChange={(e) => handler(e)}
                        ></textarea>
                      </div>
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
                            onChange={(e) => handler(e)}
                          ></input>
                        </div>
                        <div onClick={() => showPass()}>
                          <i
                            className={`fa-solid fa-eye${view} input-icons-i`}
                            style={{
                              position: "absolute",
                              top: "92%",
                              right: "14%",
                            }}
                          ></i>
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
                      marginLeft: "32%",
                      marginTop: "6%",
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
