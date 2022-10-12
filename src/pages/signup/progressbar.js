import ProgressBar from "react-bootstrap/ProgressBar";
export default function Progressbar({ level }) {
  return (
    <div style={{padding : "5%"}}>
    <ProgressBar  animated now={(level+1)*25}/>
    </div>
  );
}
