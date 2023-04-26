import React from "react";

export default function GardenHeader({setSite, user}){
    return(
        <div className="stickyheader">
            <header className="h-[80px] bg-black">
                <div className="flex flex-row justify-between items-center">
                    <img className="ml-[40px] p-[15px] w-[175px]" alt="flourish logo" 
                    src={require("./../../imgs/headerlogo-white.png")}></img>
                    <div className="mr-[70px] flex flex-row gap-[25px] items-center">
                        <button>
                            <img className="w-[40px] h-[40px]" alt="flourish logo" 
                            src={require("./../../imgs/usericon-white.png")}></img>
                        </button>
                        <p className="text-white text-md">{user.firstname} {user.lastname}</p>
                    </div>
                </div>
            </header>
        </div>
    );
}