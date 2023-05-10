import React from "react";
import Subgoal from "../../../../classes/subgoal"
import "./../../garden.css";

export default function GardenSubgoal({user, setUser, goal, subgoal, index}){
    return(
        <div>
            <div className="flex">
                <div className =
                "mt-[-40px] pl-[50px] pt-[40px] h-[80px] gardenbar bg-gradient-to-b from-russian from-30% to-yg-crayola"
                style={{zIndex:90-index}}>
                    <div className = "flex flex-row h-[40px]">
                        <div className="flex gap-[10px] w-[435px]">
                            <div className="h-[20px] self-center">
                                <button className="w-[25px] h-[25px] mt-[-3px] rounded-md border-none outline-none"
                                    onClick={() => {
                                        subgoal.finished = !subgoal.finished;
                                        goal.current = 0;
                                        for(let subgoal of goal.subgoals){
                                            if(subgoal.finished){
                                                goal.current++;
                                            }
                                        }
                                        setUser({...user});
                                    }}>
                                    {!subgoal.finished && 
                                        <>
                                            <img src={require("./../../../../imgs/checktrans.png")} alt="check mark"/>
                                        </>
                                    }
                                    {subgoal.finished && 
                                        <>
                                            <img src={require("./../../../../imgs/checkgreen.png")} alt="check mark"/>
                                        </>
                                    }
                                </button>
                            </div> 
                            <p className="text-white w-[210px] self-center">{subgoal.title}</p>
                            {new Date(...subgoal.date).getTime() >= new Date() &&
                                <p className="text-white self-center">
                                    {Subgoal.getDifferentialString(subgoal)}
                                </p>
                            }
                            {new Date(...subgoal.date).getTime() < new Date() && 
                                <p className="text-coralultrabright self-center">
                                    {Subgoal.getDifferentialString(subgoal)}
                                </p>
                            }
                        </div>
                        <button className="w-[25px] h-[25px] rounded-md border-none outline-none self-center"
                            onClick={() => {
                                let replace = [];
                                for(let item of goal.subgoals){
                                    if(subgoal.iden_subgoal !== item.iden_subgoal){
                                        replace.push(item);
                                    }
                                }
                                goal.subgoals = replace;
                                subgoal.finished = !subgoal.finished;

                                goal.current = 0;
                                for(let subgoal of goal.subgoals){
                                    if(subgoal.finished){
                                        goal.current++;
                                    }
                                }
                                setUser({...user});
                            }}>
                            <p className="text-lg text-white hover:text-coralbright">✕</p>
                            {/* <img alt="delete" className="p-[2px] object-fill" 
                                src={require("./../../../../imgs/trashcan-white.png")}></img> */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}