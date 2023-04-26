import React from 'react';
import GardenGoal from "./gardengoal/gardengoal";
import GardenGoalMaker from "./gardengoal/gardengoalmaker";
import GardenLoading from "./gardenloading";
import GardenHeader from "./gardenheader";
import "./garden.css";
import User from "./../../classes/user";

export default function Garden({setSite, user, setUser}){
    const[edit, setEdit] = React.useState(false);

    React.useEffect(() => {
        if(user){
            fetch("http://localhost:4000/set/", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(User.reverseStringify(User.stringify(user)))})
            .then(response => response.json())
            .then((info) => {setUser(User.reverseStringify(User.stringify(info.data)))})
        }
    }, [user, setUser])

    return(
        <div>
            {user && 
                <>
                    <GardenHeader setSite={setSite} user={user}/>

                    <div className = "mt-[80px]">
                        <div className="plantbg">
                            <div className="flex flex-row h-screen">
                                <div className="flex flex-col gap-[20px] pt-[20px] w-[350px] bg-russian/[0.55] stickyside">
                                    <div className="flex justify-center align-start">
                                        <div>
                                            <GardenGoalMaker setUser={setUser} user={user}/>
                                        </div>
                                    </div>
                                    <div className="flex justify-center align-start">
                                        <button className="bg-white hover:bg-russian w-[250px] h-[2.25em] rounded-lg text-russian hover:text-white"
                                        onClick={function(){
                                            setEdit(!edit);
                                        }}>
                                            <b>Edit Goals</b>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-screen ml-[350px]" style={{overflowY:'scroll'}}>
                                    <div className="pl-[50px] pt-[20px] gap-[15px] flex flex-col">
                                        {user.goals.length > 0 && (
                                            <>
                                                {user.goals.map((item, key) => {

                                                    return(
                                                    <div>
                                                        <GardenGoal
                                                            setUser={setUser}
                                                            user={user}
                                                            goal={item}
                                                            mode={edit}
                                                        />
                                                    </div>
                                                    )
                                                })}
                                            </>
                                        )}
                                        {user.goals.length <= 0 &&
                                            <>
                                                <h1 className="text-jet text-xl">
                                                    <b>Your garden is empty!<br/>Add your first goal...<br/>{"<---"}</b></h1>
                                            </>
                                        }
                                            <div className="mt-[300px]">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {!user && 
                <>
                    <GardenLoading/>
                </>
            }
        </div>
    )
}