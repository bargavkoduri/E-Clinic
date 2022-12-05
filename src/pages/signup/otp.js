import { useEffect, useRef } from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import './otp.css'

export default function OTP(props){

  const [time,setTime] = useState(30)
  const [send,setSend] = useState(false)
  // const [sentOTP,setSentOTP] = useState()
  const [email,setEmail] = useState("")
  const form = useRef()
  const [otp,setOTP] = useState(-1000)
  const otp_input = useRef()

  useEffect(() => {
    if(time !== 0){
      setTimeout(() => {
        setTime((prev) => {
          return prev - 1;
        });
      },1000)
    }
    else{
      setSend(true)
    }
  },[time])

    useEffect(() => {
      setEmail(props.data.email);
      sendemail()
    }, []);

  useEffect(() => {
    if(otp !== -1000){
       emailjs.sendForm(
         "service_yfkx7nc",
         "template_2tqeuux",
         form.current,
         "GLvxbVqjLKlm2S0Od"
       );
    }
  },[otp])

  const submithandler = () => {
    if(otp_input.current.value == otp){
      props.setLevel((prev) => {
        return prev+1;
      })
    }
    else{
       Swal.fire({
         icon: "error",
         title: "OTP didn't match",
       });
    }
  }


  const resend_otp = () => {
    if(send === true){
      let temp_otp = generateotp()
      setSend(false)
      setTime(30)
      setOTP(temp_otp)
    }
  }

  const generateotp = () => {
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  const sendemail = () => {
    let temp_otp = generateotp()
    // console.log(temp_otp)
    setOTP(temp_otp)
  }

    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h4>Enter the OTP sent to your Email</h4>
        <div className="row" style={{ marginLeft: "200px", marginTop: "50px" }}>
          <div className="col-1">
            <label>OTP</label>
          </div>
          <div className="col-4">
            <input type="text" ref={otp_input}></input>
          </div>
        </div>
        <br />
        <button
          className="btn btn-dark"
          style={{ width: "100px", marginTop: "30px" }}
          onClick={() => submithandler()}
        >
          Next
        </button>
        <br />
        <br />
        <div>
          <div style={{ display: "inline-block", marginRight: "5px" }} onClick={() => resend_otp()}>
            <p className={send === true ? "otpbut" : ""}>Resend OTP</p>
          </div>
          <p style={{ display: "inline-block" }}>
            {" in 00:" +
              (time.toString().length === 1 ? `0${time}` : `${time}`)}
          </p>
        </div>

        <form ref={form} style={{display : "none"}}>
          <input name="email" type="email" value={email}></input>
          <input name="otp" value={otp} type="text"></input>
        </form>
      </div>
    );
}