import React from "react";

export default function SignUp(){
    return(
        <div>
            <div className="h-screen bg-jet">
                <div className="pt-[100px] flex justify-center">
                    <div className="box-border rounded-lg h-[600px] w-[400px] pt-[50px] bg-white">
                        <div className="flex flex-col items-center">
                            <div className="">
                                <img className="object-fill w-[250px] flex justify-center" alt="flourish logo" src={require("./../imgs/logo.png")}></img>
                            </div>
                            <h1>Sign Up For An Account FREE!</h1>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}