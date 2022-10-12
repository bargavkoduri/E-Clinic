import { useState } from "react";

export default function ContactUs() {
  const [status,setStatus] = useState("default")
  if(status === "default"){
    return <ContactForm status={status} setStatus={setStatus} />
  }
  else{
    return <Status status={status} />
  }
}

function ContactForm(props){
    return (
      <section id="contact_us" style={{backgroundColor : "white"}}>
        <div className="container-fluid cont">
          <h1 className="work">Drop Us a Message/Grievance</h1>

          <div className="row">
            <div className="col padd">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control contact-us-input"
                        id="email"
                        placeholder="Your Email *"
                        name="emaiil"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control contact-us-input"
                        id="name1"
                        placeholder="Your Name *"
                        name="namee"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control contact-us-input"
                        id="name2"
                        placeholder="Your Phone Number *"
                        name="phonee"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control contact-us-input"
                        id="text-something"
                        placeholder="Feel free to drop us a suggestion/grievance"
                        style={{ width: "100%", height: "200px" }}
                        name="queryy"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <button
                        className="btn contbtn"
                        type="submit"
                        onClick={() => props.setStatus("successful")}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}

function Status(props) {
   if(props.status === "successful"){
    return <>
    <h4>Message Received</h4>
    </>
   }
   else{
    return <>
    <h4>something went wrong please try again</h4>
    </>
   }
}