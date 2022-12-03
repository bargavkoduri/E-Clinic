import axios from "axios";
import { useContext, useRef } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";

export default function Profile() {
  const { data, setData } = useContext(UserContext);
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

  const aadharnumber = useRef();
  const phonenumber = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    let tempp = validate(data.phonenumber, 10);
    let tempa = validate(data.aadhdarnumber, 12);
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
    if (tempa !== true && tempp !== true) {
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
        backgroundColor: "#eee",
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
                    <br />
                    <div className="col-6">
                      <div className="row">
                        <label style={{ fontWeight: "450" }}>Allergies</label>
                        <textarea
                          className="form-control"
                          style={{ height: "125px", width: "550px" }}
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
                          style={{ height: "125px", width: "550px" }}
                          value={data.past_medical_history}
                          name="past_medical_history"
                          onChange={(e) => handler(e)}
                        ></textarea>
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
