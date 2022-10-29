import { useContext } from "react";
import { UserContext } from "../../App";

export default function Profile() {
  const {data} = useContext(UserContext)
  return (
    <div
      className="row"
      style={{
        backgroundColor: "#eee",
        height: "97vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="col-2 container"
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          height: "40%",
          paddingTop: "20px",
          marginTop: "40px",
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px",
          flex: "1",
          borderRadius: "10px",
        }}
      >
        <div className="text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            style={{ width: "150px" }}
          />
          <p className="text-muted">Name</p>
        </div>
      </div>

      <div className="container" style={{ flex: "2" }}>
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
              paddingLeft : "50px",
              borderRadius: "10px",
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
            <form>
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-3">
                      <label className="col-form-label">Name</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={data.name}
                      ></input>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-3">
                      <label className="col-form-label">Phone Number</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={data.phonenumber}
                      ></input>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-3">
                      <label className="col-form-label">Aadhar Number</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={data.aadhdarnumber}
                      ></input>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-3">
                      <label className="col-form-label" value={data.dob}>
                        DOB
                      </label>
                    </div>
                    <div className="col-8">
                      <input type="date" className="form-control"></input>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-3">
                      <label className="col-form-label">Gender</label>
                    </div>
                    <div className="col-8">
                      <select className="form-control" value={data.gender}>
                        <option value="Male">Male</option>
                        <option value="FeMale">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <div className="col-6">
                  <div className="row">
                    <label>Allergies</label>
                    <textarea
                      className="form-control"
                      style={{ height: "125px", width: "550px" }}
                      value={data.allergies}
                    ></textarea>
                  </div>
                  <br />
                  <div className="row">
                    <label>Past Medical History</label>
                    <textarea
                      className="form-control"
                      style={{ height: "125px", width: "550px" }}
                      value={data.past_medical_history}
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
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
