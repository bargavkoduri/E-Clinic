import { useContext } from "react";
import { PatientContext } from ".";


export default function Message() {

  const {msgs,setMsgs} = useContext(PatientContext)  

  const markasread = (id) => {
    let temp = msgs.filter((msg) => msg.id !== id)
    setMsgs(temp)
  }

  return (
    <div
      style={{ backgroundColor: "#eee", height: "100vh", paddingTop: "50px" }}
      className="container-fluid"
    >
      {msgs.map((msg) => {
        return (
            <div
          className="row"
          style={{
            paddingTop: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "70%",
            paddingBottom : "20px",
            marginBottom: "35px",
          }}
          key={msg.id}
        >
          <p style={{ padding: "1%",color : "black" }}>
            {msg.message}
          </p>

          <button
            className="btn btn-success"
            style={{
              color: "white",
              marginLeft: "700px",
            }}
             onClick = {() => markasread(msg.id)}
          >
            Mark as Read
          </button>
        </div>
        )
      })}
    </div>
  );
}