import Upcoming from "./upcoming"
import Book from "./booking"

export default function Display(props){

    if(props.level === "Upcoming_Appointments"){
        return <Upcoming/>
    }
    else if(props.level === "Info"){
        return <>Info</>
    }
    else if(props.level === "Booking"){
        return <Book/>
    }
    else if(props.level === "Cancel_Appointment"){
        return <>
        Cancel Appointment</>
    }
    else if(props.level === "Past_Appointment"){
        return<>
        Past_Appointment</>
    }
    else{
        return <>Messages</>
    }
}