import axios from "axios";
import { useRef, useState } from "react";

export default function Credential(props) {
  const email = useRef();
  const password = useRef();
  const repassword = useRef();
  const [errmsg,setErrmsg] = useState("");

  const showPassword = () => {
    if (password.current.type === "password") {
      password.current.type = "text";
      repassword.current.type = "text";
    } else {
      password.current.type = "password";
      repassword.current.type = "password";
    }
  };

  async function ValidateEmail(x) {
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= x.length
    ) {
      return false;
    }
    else{
      let resp = await axios.get(`http://localhost:5000/patients?email=${x}`);
      if (resp.data.length === 0)
        resp = await axios.get(`http://localhost:5000/doctors?email=${x}`);
      if (resp.data.length !== 0) {
        setErrmsg("Email Already Exists");
        setTimeout(() => {
          setErrmsg("");
        }, 5000);
        return false;
      }
      else{
        return true;
      }
    }
  }

  function ValidatePassword(x){
    if(x.length >= 8){
      let bigchar = 0;
      let smallchar = 0;
      let numeric = 0;
      for(let i = 0;i < x.length;i++){
        if(x[i] >= '0' && x[i] <= '9')
        numeric += 1;
        else if(x[i] >= 'a' && x[i] <= 'z')
        smallchar += 1;
        else if(x[i] >= 'A' && x[i] <= 'Z')
        bigchar += 1;
      }
      if(bigchar >= 1 && smallchar >= 1 && numeric >= 1)
        return true;
      else
        return false;
    }
    return false;
  } 

  const fun = async () => {
    let flag = 0
    let email_validation = await ValidateEmail(email.current.value);
    let similar = password.current.value === repassword.current.value;
    let password_validation = ValidatePassword(password.current.value);
    if(email_validation === false){
        flag = 1;
        email.current.focus();
        email.current.style["box-shadow"] = "0 0 10px red";
        email.current.style["background"] =
          "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
        setTimeout(() => {
          email.current.style["box-shadow"] = "";
          email.current.style["background"] = "";
        }, 5000);
    }
      
    if(password_validation === false){
      flag = 1
      password.current.focus();
      password.current.style["box-shadow"] = "0 0 10px red";
      password.current.style["background"] =
         "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        password.current.style["box-shadow"] = "";
        password.current.style["background"] = ""
      },5000)
    }

    if(similar === false){
      flag = 1
      repassword.current.focus();
      repassword.current.style["box-shadow"] = "0 0 10px red";
      repassword.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        repassword.current.style["box-shadow"] = "";
        repassword.current.style["background"] = ""
      },5000)
    }

    if(flag === 0){
      props.setData({
        email : email.current.value,
        password : password.current.value
      })
      props.setLevel(2)
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "5%" }}>
      <div className="signup-log">
        <form>
          <div className="form-group">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-envelope ic "></i>
              </div>
              <div className="col-10">
                <input
                  type="email"
                  className="form-control signupi"
                  id="email"
                  name="email"
                  placeholder="Your Email Address"
                  ref={email}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-lock ic "></i>
              </div>
              <div className="col-10">
                <input
                  type="password"
                  className="form-control signupi"
                  id="password"
                  name="password"
                  placeholder="Password"
                  ref={password}
                ></input>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-2">
                <i className="fas fa-key ic"></i>
              </div>
              <div className="col-10">
                <input
                  type="password"
                  className="form-control signupi"
                  id="password1"
                  name="password1"
                  placeholder="Re-Enter Password "
                  ref={repassword}
                ></input>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
            <div className="col-2">

            </div>
            <div className="col-10">
              <h6 style={{color : "red",fontSize : '0.85rem'}}>{errmsg}</h6>
            </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-2"></div>
              <div
                className="col-10"
                style={{ textAlign: "left", paddingLeft: "3%" }}
              >
                <input type="checkbox" onClick={() => showPassword()}></input>
                <h6 style={{ display: "inline",marginLeft : "5px" }}>Show Password</h6>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="constrain">
        <ul>
          <li className="list ">
            password should be at-least 8 character long
          </li>
          <li className="list ">
            password should have at-least 1 uppercase and 1 lowercase character
          </li>
          <li className="list ">
            password should have at-least 1 numeric character
          </li>
        </ul>
      </div>

      <div className="credential-but">
        <button className="btn btn-dark btn-lg btn-block" onClick={() => fun()}>
          Next
        </button>
      </div>
    </div>
  );
}
