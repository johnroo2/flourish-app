import React from 'react';
import GardenGoal from "./gardengoal";
import GardenGoalMaker from "./gardengoalmaker";
import Goal from "./goal";

export default function Garden(){
    const[info, setInfo] = React.useState([
                new Goal("Write a cover letter!!", "Me", 0, 400),
                new Goal("Drink 2L of water", "Amelia", 1040, 2000),
                new Goal("Write a short story", "Lucas", 3, 4)]);
    const[edit, setEdit] = React.useState(false);

    function setInfoPush(push){
        let clone = [...info];
        clone.push(push);
        setInfo(clone);
    };

    function setInfoPop(key){
        let clone = [...info];
        let replace = [];
        for(let i = 0; i < clone.length; i++){
            if(!(clone[i].id === key)){
                replace.push(clone[i]);
            }
        }
        setInfo(replace);
    };

    return(
        <div>
            <div>
                <header className="h-[80px] bg-white">
                    <div className="">
                        <img className="ml-[40px] p-[15px] object-fill w-[175px] flex justify-center" alt="flourish logo" 
                        src={require("./../../imgs/headerlogo.png")}></img>
                    </div>
                </header>
            </div>

            <div className="">
                <div className="flex flex-row h-screen">
                    <div className="flex flex-col gap-[20px] pt-[20px] w-[500px] bg-palebold">
                        <div className="flex justify-center align-start">
                            <div>
                                <GardenGoalMaker setInfoPush={setInfoPush}/>
                            </div>
                        </div>
                        <div className="flex justify-center align-start">
                            <button className="bg-russian hover:bg-coral w-[250px] h-[2.25em] rounded-lg text-white"
                            onClick={function(){
                                setEdit(!edit);
                            }}>
                                Edit Goals
                            </button>
                        </div>
                    </div>
                    <div className="pl-[50px] pt-[20px] gap-[15px] w-screen bg-pale flex flex-col">
                        {info.length > 0 &&
                            <>
                                {info.map(function(item, key){
                                    return(<GardenGoal setInfoPop={setInfoPop} goal={item} mode={edit}/>)})
                                }
                            </>
                        }
                        {info.length <= 0 &&
                            <>
                                <h1 className="text-jet text-xl">
                                    <b>Your garden is empty!<br/>Add your first goal...<br/>{"<----"}</b></h1>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}