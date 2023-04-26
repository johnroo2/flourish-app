import React from  "react";
import GardenDropDown from "./gardendropdown";
import ErrorBlock from "./../../errorblock";
import Goal from "./../../../classes/goal";
import "./../../garden/garden.css"

export default function GardenGoalMaker({setUser, user}){
    const[addState, setAddState] = React.useState(false);

    const[title, setTitle] = React.useState('');
    const[limitOption, setLimitOption] = React.useState('---');
    const[streakType, setStreakType] = React.useState('---');

    const[error, setError] = React.useState(-1);

    function checkSubmission(strict){
        function errorScan(){
            if(!title.trim()){return 0;}
            if(limitOption === "---"){return 1;}
            else{
                if(limitOption === "Streak"){
                    if(streakType === "---"){return 2;}
                }
            }
            return -1;
        }
        let sub = strict ? errorScan() : !(error === -1) ? errorScan() : -1;
        setError(sub);
        return sub;
    }

    function handleInputChange(fc){
        return function(event){
          fc(event.target.value);
        }
    }

    function resetForm(){
        setError(-1);
        setTitle('');
        setStreakType("---");
        setLimitOption("---");
        setAddState(false);
    }

    React.useEffect(() => {checkSubmission(false)});

    return(
        <div className="">
            <button className="bg-white hover:bg-russian w-[250px] h-[2.25em] rounded-lg text-russian hover:text-white"
            onClick={function(){
                setAddState(true);
            }}>
                <b>New Goal</b>
            </button>

            {addState && 
                <>
                    <div className="blurbg"/>

                    <div className="modal bg-yg-crayola rounded-lg content-between" style={{zIndex:200}}>
                        <div className="p-[25px] flex flex-col h-[400px]">
                            <div className="">
                                <div>
                                    <label htmlFor="title" className="text-white text-sm">
                                    Title
                                    </label>
                                </div>

                                <input id="title" className="mt-[2px] border-jet border-[2px] w-[250px] h-[2em] rounded-lg pl-[10px]" placeholder = "" required 
                                    value={title} onChange={handleInputChange(setTitle)}></input>
                                {error === 0 && <><ErrorBlock text={"Please enter a title"}/></>}

                                <div className="">
                                    <label htmlFor="limitsel" className="text-white text-sm">
                                        Goal Type
                                    </label>
                                </div>

                                <GardenDropDown id="limitsel" optionSetter={setLimitOption}
                                options={["---", "Default", "Streak"]}/>
                                {error === 1 && <><ErrorBlock text={"Select a goal type"}/></>}
                                
                                {limitOption === "Streak" &&
                                    <>              
                                        <div className="">
                                            <label htmlFor="streaksel" className="text-white text-sm">
                                                Streak Period
                                            </label>
                                            <GardenDropDown id="streaksel" optionSetter={setStreakType}
                                            options={["---", "Days", "Weeks", "Months", "Years"]}/>
                                        </div>
                                        {error === 2 && <><ErrorBlock text={"Select a streak period"}/></>}
                                    </>
                                }
                            </div>
                            <div className="flex flex-row gap-[8px] mt-auto">
                                <button className="bg-jet hover:bg-coral w-[120px] h-[2em] rounded-lg text-white"
                                    onClick={function(){
                                        if(checkSubmission(true) === -1){
                                            user.goals.push(new Goal(title, user.firstname, streakType, user.goalcount++));
                                            setUser({...user});
                                            console.log(user);
                                            resetForm();
                                        }
                                    }}> 
                                Submit
                                </button>
                                <button className="bg-russian hover:bg-coral w-[120px] h-[2em] rounded-lg text-white"
                                    onClick={function(){
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