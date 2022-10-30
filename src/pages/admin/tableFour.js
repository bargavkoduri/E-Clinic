import axios from 'axios'
import { React,useEffect,useState } from 'react'

export default function TableFour() {
  function deletePatient(id){
  fetch(`http://localhost:5000/patients/${id}`,{
    method:'DELETE'
  }).then((result)=>{
    result.json().then((resp)=>{
      console.log(resp);
      getPatients()
    })
  })
  }
  let [res,setRes] = useState("default")
    useEffect(()=>{
      getPatients()
          
    },[]) 
    function getPatients(){
      axios.get("http://localhost:5000/patients").then(res=>{
        setRes(res)
      }) 
    }
  
        if(res !=="default"){
          return (
            <div className="removePatient" id="tb4">
                <div className="remp">
                    <b>Remove Patient</b>
                </div>

                    <br/><br/>
                        <table className="table" id="table4">
                            <thead>
                                <tr className="bg-light">
                                    <th scope="col" width="10%">patient id</th>
                                    <th scope="col" width="10%">name</th>
                                    <th scope="col" width="10%">email</th>
                                    <th scope="col" width="10%">RemovePatient</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                              res.data.map((patient,index) => {
						                    return (
                                <tr key={index}>
                                  <td  key={`1${index}`}>
                                    {patient.id}
                                  </td>
                                  <td key={`2${index}`}>
                                  {patient.name}    
                                  </td>
                                  <td key={`3${index}`}>
                                  {patient.email}
                                  </td>
                                  <td key={`4${index}`}>
                                  <button onClick={()=>deletePatient(patient.id)}>Remove</button>
                                  </td>
                                </tr>    
                              )
                              }    )         
                            }
                            </tbody>
                        </table>
    
                        <br/> <br/>
                        </div>
                )
        }
    
      }
         
