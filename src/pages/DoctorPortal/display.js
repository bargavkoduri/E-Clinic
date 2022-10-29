export default function Display(props){
    if(props.level === "Upcoming_Appointments"){
        return <>Upcoming</>
    }
    else if(props.level === "Info"){
        return <>Info</>
    }
    else if(props.level === "Schedule_Manager"){
        return <>Schedule Manager</>
    }
    else if(props.level === "Cancel_Appointment"){
        return <>Cancel Appointment</>
    }
    else if(props.level === "Messages"){
        return <>Messages</>
    }
    else if(props.level === "Past_Appointment"){
        return <>Past Appointment</>
    }
}