import { useRef } from "react";
import Data from "./data";

export default function Patient(props){

    const name = useRef("")
    const phonenumber = useRef("")
    const aadhdarnumber = useRef("")
    const dob = useRef("")
    const gender = useRef("")
    const allergies = useRef("")
    const past = useRef("")

    const helperfun = (x,num) => {
      if(x.length > 0  && x.length < num)
        return true
      if(x.length > 0){
         for (let i = 0; i < num; i++) {
           if (x[i] < "0" && x[i] > "9") 
            return true;
         }
      }
      return false;
    }

    const fun = () => {
      let flag = 0
      if(name.current.value === ""){
        flag = 1
         name.current.style["box-shadow"] = "0 0 10px red";
         name.current.style["background"] =
           "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
         name.current.focus()
         setTimeout(() => {
          name.current.style["box-shadow"] = ""
          name.current.style["background"] = ""
         },5000)
      }
    
      if(phonenumber.current.value === ""){
          flag = 1;
          phonenumber.current.style["box-shadow"] = "0 0 10px red"
          phonenumber.current.style["background"] =
            "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
          phonenumber.current.focus()
          setTimeout(() => {
            phonenumber.current.style["box-shadow"] = ""
            phonenumber.current.style["background"] = ""
          }, 5000);
      }
      
      if(dob.current.value === ""){
         flag = 1;
         dob.current.style["box-shadow"] = "0 0 10px red";
         dob.current.style["background"] =
           "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
         dob.current.focus()
         setTimeout(() => {
           dob.current.style["box-shadow"] = "";
           dob.current.style["background"] = ""
         }, 5000);
      }
      if(aadhdarnumber.current.value === ""){
        flag = 1;
        aadhdarnumber.current.style["box-shadow"] = "0 0 10px red";
        aadhdarnumber.current.style["background"] =
          "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
        aadhdarnumber.current.focus()
        setTimeout(() => {
          aadhdarnumber.current.style["background"] = ""
          aadhdarnumber.current.style["box-shadow"] = "";
        }, 5000);
      }
        
      if(gender.current.value === "none"){
        flag = 1;
        gender.current.style["box-shadow"] = "0 0 10px red"
        gender.current.style["background"] =
          "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
        gender.current.focus()
        setTimeout(() => {
          gender.current.style["background"] = ""
          gender.current.style["box-shadow"] = ""
        },5000)
      }
        
      if(helperfun(phonenumber.current.value,10)){
        flag = 1;
         if(phonenumber.current.value !== ""){
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
       
      if(helperfun(aadhdarnumber.current.value,12)){
        flag = 1;
          if(aadhdarnumber.current.value !== ""){
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
          newdata.name = name.current.value
          newdata.aadhdarnumber = aadhdarnumber.current.value
          newdata.phonenumber = phonenumber.current.value
          newdata.gender = gender.current.value
          newdata.dob = dob.current.value
          newdata.allergies = allergies.current.value
          newdata["past_medical_history"] = past.current.value
          newdata.appointments = []
          newdata.messages = []
          return newdata
        })
      }
    }

    return (
      <div style={{ textAlign: "center", padding: "5% 5% 5% 5%",position : "relative",top:"-50px" }}>
        <form>
          <div className="signup-log">
            <div className="form-group">
              <div className="row">
                <div className="col-1">
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
                <div className="col-1">
                  <i className="bi bi-telephone-fill "></i>
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
                <div className="col-1">
                  <i className="bi bi-calendar-date-fill "></i>
                </div>
                <div className="col-10">
                  <input
                    type="date"
                    ref={dob}
                    className="form-control"
                    placeholder="D.O.B"
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-1">
                  <i className="fa fa-id-card " aria-hidden="true"></i>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    ref={aadhdarnumber}
                    className="form-control"
                    placeholder="Adhar Number"
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-1">
                  <i className="bi bi-people-fill "></i>
                </div>
                <div className="col-10">
                  <select className="form-control" ref={gender}>
                    <option value="none" disabled selected hidden>Gender</option>
                    <option value="male">Male</option>
                    <option value="femlae">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-1">
                  <i className="fa-solid fa-head-side-cough "></i>
                </div>
                <div className="col-10">
                  <textarea
                    className="form-control"
                    ref={allergies}
                    style={{ width: "100%", height: "70px" }}
                    placeholder="Allergies If any"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-1">
                  <i className="fa-solid fa-book-medical "></i>
                </div>
                <div className="col-10">
                  <textarea
                    className="form-control"
                    ref={past}
                    style={{ width: "100%", height: "70px" }}
                    placeholder="Past Medical History we should know"
                  ></textarea>
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