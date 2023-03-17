import "./admin.css"
import axios from 'axios' 
import { React,useEffect,useState } from 'react'
import { SERVER_URL } from "../../constants"

export default function TableThree() {
   function deleteDoctor(id){
      fetch(`${SERVER_URL}/doctors/${id}`,{
        method:'DELETE'
      }).then((result)=>{
        result.json().then((resp)=>{
          console.log(resp);
          getogDoctors()
        })
      })
      }
      let [res,setRes] = useState("default")
    useEffect(()=>{
      getogDoctors()
          
    },[]) 
    function getogDoctors(){
      axios.get(SERVER_URL+"/doctors").then(res=>{
        setRes(res)
      }) 
    }

    if(res !=="default"){
    return (
        <div className="removeDoctor" id="tb3">
            <div className="rem">
                <b>Remove Doctor</b>
            </div>
                <br/>
                    <table className="table" id="table3">
                        <thead>
                            <tr>
                                <th scope="col" width="10%">doctor id</th>
                                <th scope="col" width="10%">name</th>
                                <th scope="col" width="10%">email</th>
                                <th scope="col" width="10%">qualification</th>
                                <th scope="col" width="10%">Department</th>
                                <th scope="col" width="10%">remove Doctor</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        res.data.map((doctor,index) => {
					         return (
                        <tr key={index}>
                         <td key={`1${index}`}>
                                 {doctor.id}
                         </td>
                         <td key={`2${index}`}>
                             {doctor.name}    
                         </td>
                         <td key={`3${index}`}>
                            {doctor.email}
                         </td>
                         <td key={`4${index}`}>
                            {doctor.qualification}
                         </td>
                         <td key={`5${index}`}>
                            {doctor.department}
                         </td>
                         <td key={`6${index}`}>
                            <button onClick={()=>deleteDoctor(doctor.id)}>Remove</button>
                        </td>
                        </tr>    
                        )
                         })         
                }
                        </tbody>
                    </table>

                    <br/> <br/>
        </div>
          )}else{
            return <p>hh</p>
          }
}