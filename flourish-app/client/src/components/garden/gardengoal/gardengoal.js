import React from "react";
import GardenSubgoal from "./gardensubgoal/gardensubgoal";
import GardenSubgoalMaker from "./gardensubgoal/gardensubgoalmaker";
import "./../garden.css";
import "../../../classes/subgoal";
import Goal from "./../../../classes/goal";

export default function GardenGoal({setUser, user, goal, mode}){
    const [open, setOpen] = React.useState(false);
    const [info, setInfo] = React.useState(goal);

    let barsize = info.subgoals.length > 0 ? 320  * (info.current/info.subgoals.length) : 0;

    React.useEffect(() => {
        setInfo(goal);
    }, [goal])

    return(
        <div className="flex flex-col">
            <div className="h-[100px] gardenbar
            bg-gradient-to-b from-grapefruit to-clementine 
            flex flex-row z-[95]">
                <div>
                    <div className="pl-[25px]">
                        <p className="w-[350px] mt-[10px] text-white p-[3px] text-lg"><b>
                            {info.username ? `${info.username}: ` : ""}
                            {info.title}</b></p>
                        {info.streak === "---" &&
                            <>
                                <div>
                                    {info.subgoals.length> 0 &&
                                        <>
                                            <label htmlFor="progress" className="p-[3px] text-white text-sm">
                                                {info.current} of {info.subgoals.length} goals met</label>
                                            <div id = "progress" className="p-[2px] mt-[3px] bg-white/[0.4] h-[12px] w-[325px] rounded-lg">
                                                <div className="bg-gradient-to-r from-clementine
                                                to-tangerine h-[8px] rounded-lg" 
                                                style={{width:barsize+"px"}}/>
                                            </div>
                                        </>
                                    }
                                    {info.subgoals.length <= 0 &&
                                        <>
                                            <label htmlFor="progress" className="p-[3px] text-white text-sm">
                                                Make some subgoals to help you get there ↓↓↓</label>
                                            <div id = "progress" className="p-[2px] mt-[3px] bg-white/[0.4] h-[12px] w-[325px] rounded-lg">
                                                <div className="bg-gradient-to-r from-clementine
                                                to-tangerine h-[8px] rounded-lg" 
                                                style={{width:"0px"}}/>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        }

                        {info.streak !== "---" &&
                            <>
                                <p className="mt-[-5px] p-[2px] text-sm text-white">{Goal.streakmapping(info)}</p>
                                <p className="p-[2px] text-sm text-white">Current Streak: {info.current}</p>
                            </>
                        }
                        </div>                        
                    </div>

                    <div className="ml-[40px] mt-[30px]">
                        {mode && <>
                            <div className="">
                                <button className="w-[40px] h-[40px] bg-white rounded-lg flex justify-center items-center"
                                onClick={() => {
                                    let replace = [];
                                    for(let item of user.goals){
                                        if(goal.iden_goal !== item.iden_goal){
                                            replace.push(item);
                                        }
                                    }
                                    user.goals = replace;
                                    setUser({...user});
                                    }}>
                                    <img alt="delete" className="p-[10px] object-fill pulse" src={require("./../../../imgs/trashcan.png")}/>
                                </button>
                            </div>
                        </>}
                        {!mode && <>
                            <div className="w-[40px] h-[40px]"/>
                        </>}
                    </div>

                    <div>
                        <div className="ml-[20px] mt-[30px]">
                            <button className="w-[40px] h-[40px] bg-transparent rounded-lg flex justify-center items-center border-none outline-none"
                            onClick={() => {
                                setOpen(!open)
                                }}>
                                <img alt="delete" className="p-[10px] object-fill" src={require("./../../../imgs/dropdownarrow.png")}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {open && info.streak === '---' &&
                        <>
                        {Goal.getReverseSubgoals(info).map(function(subgoal, key){
                            return(
                                open &&
                                <div>
                                    <GardenSubgoal user={user} setUser={setUser} goal={info} subgoal={subgoal} index={key}/>
                                </div>
                            )
                        })}
                        <GardenSubgoalMaker user={user} setUser={setUser} goal={info} setGoal={setInfo}/>
                        </>
                    }

                    {open && info.streak !== '---' &&
                        <>
                            {console.log(info.streak)}
                        </>
                    }
                </div>
        </div>
    )
}