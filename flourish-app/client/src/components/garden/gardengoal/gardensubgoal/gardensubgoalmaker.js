import React from "react";
import Subgoal from "../../../../classes/subgoal";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./../../garden.css";

export default function GardenSubgoalMaker({user, setUser, goal, setGoal}){
    const [addState, setAddState] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [time, setTime] = React.useState(null);

    function handleInputChange(fc){
        return function(event){
          fc(event.target.value);
        }
    }

    function resetForm(){
        setTitle('');
        setDate(null);
        setTime(null);
        setAddState(false);
    }

    return(
        <div>
            {!addState &&
                <>
                    <div className =
                    "box-border rounded-2xl mt-[-40px] h-[80px] w-[525px] bg-gradient-to-b from-russian from-30% to-yg-crayola flex justify-center flex-row"
                    style={{zIndex:50}}>
                        <button className = "mt-[40px] h-[40px] w-[300px] text-center text-white border-none outline-none"
                            onClick={() => {
                                setAddState(!addState);
                            }}>
                            Add a Subgoal
                        </button>
                    </div> 
                </>
            }
            {addState &&
                <>
                    <div className="blurbg" 
                    style={{zIndex:150}}></div>

                    <div className="modal bg-yg-crayola rounded-lg h-[250px] p-[25px]" style={{zIndex:200}}>
                        <div className="flex flex-col gap-[10px] content-center h-[200px]">
                            <div className="flex flex-col content-center">
                                <label htmlFor="title" className="text-white text-sm">Title</label>
                                <input id="title" className="flex mt-[2px] border-jet border-[2px] w-[250px] h-[2em] rounded-lg pl-[10px]" placeholder = "" required 
                                    value={title} onChange={handleInputChange(setTitle)}></input>
                            </div>

                            <div className="flex flex-row gap-[20px]">
                                <div className="flex flex-col">
                                    <label htmlFor="date" className="text-white text-sm">Date</label>
                                    <div id="date" className="">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker value={date} onChange={(newDate) => setDate(newDate)} className="datepickerinput"/>  
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="time" className="text-white text-sm">Time</label>
                                    <div id="time" className="">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker value={time} onChange={(newTime) => setTime(newTime)} className="datepickerinput"
                                            format="hh:mm A" ampm={true}/>  
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-[8px] mt-auto">
                                <button className = "h-[2em] w-[100px] bg-jet hover:bg-coral rounded-lg text-center text-white border-none outline-none"
                                    onClick={() => {
                                        console.log(date);
                                        console.log(time);
                                        goal.subgoals.push(new Subgoal(title, 0, user.subgoalcount++));
                                        setUser({...user});
                                        resetForm();
                                    }}>
                                    Submit
                                </button>
                                <button className = "h-[2em] w-[100px] bg-russian hover:bg-coral rounded-lg text-center text-white border-none outline-none"
                                    onClick={() => {
                                        resetForm();
                                    }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}