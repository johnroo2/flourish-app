import React from "react";
import "./garden.css";

export default function GardenGoal({setInfoPop, goal, mode}){
    let barsize = 350  * (goal.current/goal.limit);

    return(
        <div className="box-border rounded-3xl h-[100px] w-[500px]
        bg-gradient-to-b from-grapefruit to-clementine 
        flex flex-row">
            <div>
                <div className="pl-[25px]">
                    <p className="mt-[10px] text-white p-[3px] text-lg"><b>
                        {goal.user ? `${goal.user}: ` : ""}
                        {goal.title}</b></p>
                    <div>
                        <label htmlFor="progress" className="p-[3px] text-white text-sm">
                            {goal.current} of {goal.limit} goals met</label>
                        <div id = "progress" className="mt-[5px] bg-jetred h-[10px] w-[325px] rounded-lg">
                            <div className="bg-gradient-to-r from-white 
                            to-coralbright h-[10px] rounded-lg" 
                            style={{width:barsize+"px"}}/>
                        </div>
                    </div>
                </div>
            </div>
            {mode && <>
                <div className="ml-[50px] mt-[20px]">
                    <button className="w-[50px] h-[50px] bg-white rounded-lg flex justify-center items-center"
                    onClick={() => {setInfoPop(goal.id)}}>
                        <img alt="delete" className="p-[10px] object-fill pulse circle" src={require("./../../imgs/trashcan.png")}/>
                    </button>
                </div>
            </>}
        </div>
    )
}