import "./signin.css";

import { Link } from "react-router-dom";
function Index() {
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
                // className="img-fluid"
                style={{ "border-radius": "1rem 0 0 1rem" }}
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
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    id="but"
                    type="button"
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
