import './signup.css'
import Data from './data'
export default function Index(){
    return (
      <>
        <section id="signup">
          <div className="container-fluid signup-cont">
            <div className="card signup-card">
              <div className="row">
                <div className="col-lg-5 col-md-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid signup-img"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-lg-7 col-md-7">
                  <Data />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}