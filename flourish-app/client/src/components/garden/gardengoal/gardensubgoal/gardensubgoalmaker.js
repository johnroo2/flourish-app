import React from "react";
import Subgoal from "../../../../classes/subgoal";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import ErrorBlock from "./../../../errorblock";
import "./../../garden.css";

export default function GardenSubgoalMaker({user, setUser, goal, setGoal}){
    const [animationState, setAnimationState] = React.useState(0);
    const [midAnimation, setMidAnimation] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [time, setTime] = React.useState(null);
    const [error, setError] = React.useState(-1);

    function handleInputChange(fc){
        return function(event){
          fc(event.target.value);
        }
    }

    function checkSubmission(strict){
        function errorScan(){
            if(!title.trim()){return 0;}
            return -1;
        }
        let sub = strict ? errorScan() : !(error === -1) ? errorScan() : -1;
        setError(sub);
        return sub;
    }

    function resetForm(){
        setTitle('');
        setAnimationState(3);
        setDate(null);
        setTime(null);
        setError(-1);
    }

    const animateClass = (index) => {
        if(index === 1){return 'fadein'}
        if(index === 3 || index === 0){return 'fadeout'}
    }

    React.useEffect(() => {checkSubmission(false)});

    React.useEffect(() => {
        let current = dayjs();
        current["$d"] = new Date(current["$d"].getFullYear(), current["$d"].getMonth(),
            current["$d"].getDate(), current["$d"].getHours()+1);
        setDate(current);
        setTime(current);
    }, []);

    React.useEffect(() => {
        const updateAnimate = () => {
            setAnimationState(prev => {
                if(prev === 1){
                    return 2;
                }
                if(prev === 3){
                    return 0;
                }
                return prev;
            })
        }

        if(midAnimation){
            setTimeout(() => {
                updateAnimate();
            }, 150)
        }
    }, [midAnimation])

    return(
        <div>
            <div className =
            "box-border rounded-2xl mt-[-40px] h-[80px] w-[525px] bg-gradient-to-b from-russian from-30% to-yg-crayola flex justify-center flex-row"
            style={{zIndex:50}}>
                <button className = "mt-[40px] h-[40px] w-[300px] text-center text-white border-none outline-none"
                    onClick={() => {
                        setAnimationState(1);
                    }}>
                    Add a Subgoal
                </button>
            </div> 
            {/*
            0: NOTHING
            1: CLICKED, FADING IN
            2: PASSIVE, IN
            3: CLICKED, FADING OUT
            */}
            {animationState !== 0 &&
                <>
                    <div className="blurbg" 
                    style={{zIndex:150}}></div>

                    <div className={`${animateClass(animationState)} modal bg-yg-crayola rounded-lg h-[225px] p-[25px]`} style={{zIndex:200}}
                        onAnimationStart={() => {
                            setMidAnimation(true);
                        }}
                        onAnimationEnd={() => {
                            setMidAnimation(false);
                        }}>
                        <div className="flex flex-col gap-[10px] content-center h-[200px]">
                            <div className="flex flex-col content-center">
                                <label htmlFor="title" className="text-white text-sm">Title</label>
                                <input id="title" className="flex mt-[2px] border-jet border-[2px] w-[250px] h-[2em] rounded-lg pl-[10px]" placeholder = "" required 
                                    value={title} onChange={handleInputChange(setTitle)}></input>
                                {error === 0 && <><ErrorBlock text={"Please enter a title"}/></>}
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
                                <button className = "h-[2em] w-[120px] bg-jet hover:bg-coral rounded-lg text-center text-white border-none outline-none"
                                    onClick={() => {
                                        if(checkSubmission(true) === -1){
                                            let submitDate = date["$d"];
                                            let submitTime = time["$d"];
                                            
                                            goal.subgoals.push(new Subgoal(title, 0, [submitDate.getFullYear(), 
                                                submitDate.getMonth(), submitDate.getDate(), submitTime.getHours(),
                                                submitTime.getMinutes()], user.subgoalcount++));
                                            setUser({...user});
                                            resetForm();
                                        }
                                    }}>
                                    Submit
                                </button>
                                <button className = "h-[2em] w-[120px] bg-russian hover:bg-coral rounded-lg text-center text-white border-none outline-none"
                                    onClick={() => {
                                        resetForm();
                                    }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}