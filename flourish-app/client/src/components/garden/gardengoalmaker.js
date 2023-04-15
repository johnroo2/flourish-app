import React from  "react";
import GardenDropDown from "./gardendropdown";
import GardenErrorBlock from "./gardenerrorblock";
import Goal from "./goal";

export default function GardenGoalMaker({setInfoPush}){
    const[addState, setAddState] = React.useState(false);

    const[title, setTitle] = React.useState('');
    const[limitOption, setLimitOption] = React.useState('---');
    const[limit, setLimit] = React.useState('');
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
                if(!(/^-?\d+$/.test(limit.trim()))){return 3;}
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
        setLimit('');
        setStreakType("---");
        setLimitOption("---");
        setAddState(false);
    }

    React.useEffect(() => {checkSubmission(false)});

    return(
        <div>
            {!addState &&
                <>
                    <button className="bg-russian hover:bg-coral w-[250px] h-[2.25em] rounded-lg text-white"
                    onClick={function(){
                        setAddState(true);
                    }}>
                        New Goal
                    </button>
                </>
            }

            {addState && 
                <>
                <div className="bg-gradient-to-b from-yg-crayola to-keylime w-[300px] rounded-lg">
                    <div className="p-[25px] flex flex-col">
                        <div>
                            <label htmlFor="title" className="text-jet text-sm">
                            Title
                            </label>
                        </div>

                        <input id="title" className="mt-[2px] border-jet border-[2px] w-[250px] h-[2em] rounded-lg pl-[10px]" placeholder = "" required 
                            value={title} onChange={handleInputChange(setTitle)}></input>
                        {error === 0 && <><GardenErrorBlock text={"Please enter a title"}/></>}

                        <div className="mt-[10px]">
                            <label htmlFor="limitsel" className="text-jet text-sm">
                                Goal Type
                            </label>
                        </div>

                        <GardenDropDown id="limitsel" optionSetter={setLimitOption}
                        options={["---", "Default", "Streak"]}/>
                        {error === 1 && <><GardenErrorBlock text={"Select a goal type"}/></>}

                        {limitOption === "---" && 
                            <>
                            
                            </>
                        }

                        {limitOption === "Default" &&
                            <>
                                <div className="mt-[10px]">
                                    <label htmlFor="limitset" className="text-jet text-sm">
                                    No. of Subgoals
                                    </label>
                                </div>

                                <input id="limitset" className="mt-[2px] border-jet border-[2px] w-[250px] h-[2em] rounded-lg pl-[10px]" placeholder = "" required 
                                    value={limit} onChange={handleInputChange(setLimit)}></input>
                                {error === 3 && <><GardenErrorBlock text={"Please enter a numerical value"}/></>}
                            </>
                        }
                        
                        {limitOption === "Streak" &&
                            <>              
                                <div className="mt-[10px]">
                                    <label htmlFor="streaksel" className="text-jet text-sm">
                                        Streak Period
                                    </label>
                                    <GardenDropDown id="streaksel" optionSetter={setStreakType}
                                    options={["---", "Days", "Weeks", "Months", "Years"]}/>
                                </div>
                                {error === 2 && <><GardenErrorBlock text={"Select a streak period"}/></>}

                                {!(streakType === "---") &&
                                    <>
                                        <div className="mt-[10px]">
                                            <label htmlFor="streakset" className="text-jet text-sm">
                                            Target Length
                                            </label>
                                        </div>

                                        <input id="streakset" className="mt-[2px] border-jet border-[2px] w-[250px] h-[2em] rounded-lg pl-[10px]" placeholder = "" required 
                                            value={limit} onChange={handleInputChange(setLimit)}></input>
                                        {error === 3 && <><GardenErrorBlock text={"Please enter a numerical value"}/></>}
                                    </>
                                }
                            </>
                        }
                        <div className="flex flex-row gap-[8px]">
                            <button className="mt-[25px] bg-jet hover:bg-coral w-[120px] h-[2em] rounded-lg text-white"
                                onClick={function(){
                                    if(checkSubmission(true) === -1){
                                        setInfoPush(new Goal(title, "John", Math.floor(Math.random() * (Number(limit)+1)), limit, streakType));
                                        resetForm();
                                    }
                                }}>
                            Submit
                            </button>
                            <button className="mt-[25px] bg-russian hover:bg-coral w-[120px] h-[2em] rounded-lg text-white"
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