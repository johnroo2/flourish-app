import React from "react";
import ErrorBlock from "./errorblock";
import User from "./../classes/user";
import "./garden/garden.css"

export default function Login({setSite, user, setUser}){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState({code:0, error:-1, info: {}, subtext:""});

    function handleInputChange(fc){
        return function(event){
          fc(event.target.value);
        }
    }

    function sendCreds(){
      let data = {username:username, password:password};
      fetch("http://localhost:4000/auth/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json()) 
        .then(data => {
          if(data.code === 200){
            setUser(User.reverseStringify(User.stringify(data.info)));
            setSite("garden");
          }
          setError(data);
      })
        .catch(error => console.error(error));
    }

    return (
        <div>
          <div className="h-screen flowerbg">
            <div className="blurbg"/>
            <div className="modal rounded-lg h-[600px] w-[400px] pt-[50px] bg-white/[0.85] items-center z-[200]">
                <div className="">
                  <img className="object-fill w-[175px] flex justify-center pb-[30px]" alt="flourish logo" src={require("./../imgs/logo.png")}/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-jet
                    text-center">Username</label>
                  <input type="text" id="username" className="pl-[0.5em] bg-white border border-jet text-jet
                    text-sm rounded-lg block w-[320px] h-[2.5em] text-center" placeholder="" maxlength="20"
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    />
                  {(error.error === 0 || error.error === 2) && <><ErrorBlock text={error.subtext}/></>}
                </div>
                <div className="flex flex-col mt-[10px]">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-jet
                    text-center">Password</label>
                  <input type="password" id="password" className="pl-[0.5em] bg-white border border-jet text-jet
                    text-sm rounded-lg block w-[320px] h-[2.5em] text-center" placeholder="" maxlength="20"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    />
                  {(error.error === 1 || error.error === 3) && <><ErrorBlock text={error.subtext}/></>}
                </div>
                <div>
                  <button className="text-jet hover:text-coral text-sm" 
                  onClick={() => {setSite("signup")}}>Don't Have An Account? Register!</button>
                </div>
                <div>
                  <button className="mt-[30px] bg-russian text-white rounded-lg block w-[200px] h-[2em]
                  hover:bg-coral" 
                  type="button"
                  onClick={sendCreds}
                  >Submit</button>
                </div>
              </div>
            </div>
          </div>
      )
}