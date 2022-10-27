import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
function Index() {
  let  {setUser} = useContext(UserContext);
  console.log(setUser)
  let [Errmsg, setErrmsg] = useState("");
  let email = useRef();
  let password = useRef();
  const navigate = useNavigate();

  function ValidateEmail(x) {
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= x.length
    ) {
      setErrmsg("Invalid Email");
      email.current.focus();
      email.current.style["box-shadow"] = "0 0 10px red";
      email.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        email.current.style["box-shadow"] = "";
        email.current.style["background"] = "";
        setErrmsg("");
      }, 5000);
      return false;
    } else {
      return true;
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
        password.current.style["background"] =
          "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
        setTimeout(() => {
          password.current.style["box-shadow"] = "";
          password.current.style["background"] = "";
        }, 5000);
        return false;
      }
    }
     password.current.focus();
     password.current.style["box-shadow"] = "0 0 10px red";
     password.current.style["background"] =
       "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
     setTimeout(() => {
       password.current.style["box-shadow"] = "";
       password.current.style["background"] = "";
     }, 5000);
    return false;
  }

  let logi = async () => {
    let flag = 0;
    if(ValidateEmail(email.current.value) && ValidatePassword(password.current.value)){
      let resp = await axios.get(`http://localhost:5000/patients?email=${email.current.value}&password=${password.current.value}`);
      if( resp.data.length === 0){
        resp = axios.get(
          `http://localhost:5000/doctors?email=${email.current.value}&password=${password.current.value}`
        );
        flag = 1;
      }
      if( resp.data.length === 0){
        setErrmsg("Invalid Login Credentials")
        setTimeout(() => {
          setErrmsg("")
        },5000)
      }
      else{
        if(flag === 1){
          setUser({user : "doctor",email : email.current.value,password : password.current.value})
          navigate("/doctorportal");
        }
        else{
          console.log("hello")
          setUser({
            user: "patient",
            email: email.current.value,
            password: password.current.value,
          });
         navigate("/patientportal")
        }
      }
    }
  };

  return (
    <section id="login">
      <div className="container-fluid signin-cont">
        <div className="card">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-none d-md-block">
              <img
                className={"img img-fluid"}
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                style={{ borderRadius: "1rem 0 0 1rem" }}
              />
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card-body">
                <form className="" action="/signin" method="post">
                  <h4>Sign Into Your Account</h4>
                  <div className="log">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        ref={email}
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        ref={password}
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <h6>{Errmsg}</h6>
                    </div>
                  </div>
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    id="but"
                    type="button"
                    onClick={() => logi()}
                  >
                    Login
                  </button>
                  <div className="extra">
                    <Link className="forgot-1" to="/forget">
                      Forgot Password
                    </Link>
                    <p>
                      Don't have a account?
                      <Link to="/signup" className="forgot-2">
                        {" "}
                        Register here
                      </Link>
                    </p>
                  </div>
                  <Link to="#!" className="small text-muted">
                    Terms of use.
                  </Link>
                  <Link to="#!" className="small text-muted">
                    Privacy policy
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
