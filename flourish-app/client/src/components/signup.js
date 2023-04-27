import React from "react";
import ErrorBlock from "./errorblock";
import "./garden/garden.css"

export default function SignUp({setSite, user, setUser}){
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confPassword, setConfPassword] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");

    const [serverError, setServerError] = React.useState({code:0, error:-1, subtext:""});

    function handleInputChange(fc){
        return function(event){
          fc(event.target.value);
        }
    }

    function sendAuth(){
        let data = {username:username?username:"", 
        password:password?password:"", 
        confpassword:confPassword?confPassword:"",
        firstname:firstname?firstname:"",
        lastname:lastname?lastname:""};

        fetch("http://localhost:4000/signup/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if(data.code === 200){
                setSite("login");;
            }
            setServerError({...data});
        })
          .catch(error => console.error(error));
      }

    return(
        <div>
            <div className="h-screen flowerbg">
                <div className="blurbg"/>
                <div className="z-[200] relative">
                    <div className="modal rounded-lg h-[600px] w-[400px] pt-[50px] bg-white/[0.85] items-center">
                        <div>
                            <img className="object-fill w-[175px] flex justify-center pb-[30px]" alt="flourish logo" src={require("./../imgs/logo.png")}/>
                        </div>
                    <h1 className="pb-[10px]"><b>Sign Up For An Account <i>FREE!</i></b></h1>     
                    {serverError.error === 7 && <><ErrorBlock text={serverError.subtext}/></>}
                        <div className="flex flex-col pt-[5px] gap-[5px] items-center">
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-[10px]">
                                    <div className="flex flex-col">
                                        <label htmlFor="firstname" className="pl-[1em] block mb-2 text-sm font-medium text-jet">Name</label>
                                        <input type="firstname" id="firstname" className="pl-[1em] bg-white border border-jet text-jet
                                        text-sm rounded-lg block w-[155px] h-[2.5em]" placeholder="" maxlength="20"
                                        value={firstname}
                                        onChange={handleInputChange(setFirstname)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="lastname" className="pl-[1em] block mb-2 text-sm font-medium text-jet">Surname</label>
                                        <input type="lastname" id="lastname" className="pl-[1em] bg-white border border-jet text-jet
                                        text-sm rounded-lg block w-[155px] h-[2.5em]" placeholder="" maxlength="20"
                                        value={lastname}
                                        onChange={handleInputChange(setLastname)}
                                        />
                                    </div>
                                </div>
                                {(serverError.error === 5 || serverError.error === 6)
                                        && <><ErrorBlock text={serverError.subtext}/></>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="username" className="pl-[1em] block mb-2 text-sm font-medium text-jet">Username</label>
                                <input type="text" id="username" className="pl-[1em] bg-white border border-jet text-jet
                                text-sm rounded-lg block w-[320px] h-[2.5em]" placeholder="" maxlength="20"
                                value={username}
                                onChange={handleInputChange(setUsername)}
                                />
                                {(serverError.error === 0 || serverError.error === 1)
                                    && <><ErrorBlock text={serverError.subtext}/></>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="pl-[1em] block mb-2 text-sm font-medium text-jet">Password</label>
                                <input type="password" id="password" className="pl-[1em] bg-white border border-jet text-jet
                                text-sm rounded-lg block w-[320px] h-[2.5em]" placeholder="" maxlength="20"
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                />
                                {(serverError.error === 2 || serverError.error === 3)
                                    && <><ErrorBlock text={serverError.subtext}/></>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confpassword" className="pl-[1em] block mb-2 text-sm font-medium text-jet">Confirm Password</label>
                                <input type="password" id="confpassword" className="pl-[1em] bg-white border border-jet text-jet
                                text-sm rounded-lg block w-[320px] h-[2.5em]" placeholder="" maxlength="20"
                                value={confPassword}
                                onChange={handleInputChange(setConfPassword)}
                                />
                                {serverError.error === 4 && <><ErrorBlock text={serverError.subtext}/></>}
                            </div>

                            <button className="mt-[15px] w-[200px] h-[2em] text-white rounded-lg bg-russian hover:bg-coral"
                            onClick={sendAuth}>
                                Create my Account!
                            </button>
                            <button className="text-jet hover:text-coral text-sm" 
                            onClick={() => {setSite("login")}}>Return to Login Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}