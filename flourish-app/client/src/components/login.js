import React from "react";

export default function Login(){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [auth, setAuth] = React.useState('');

    function handleInputChange(fc){
        return function(event){
          fc(event.target.value);
        }
    }

    function sendCreds(){
      let data = {username:username, password:password};
      fetch("http://localhost:4000/api/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          setAuth(data.username);
      })
        .catch(error => console.error(error));
    }

    return (
        <div>
          <div className="h-screen bg-jet">
            <div className="pt-[100px] flex justify-center">
              <div className="box-border rounded-lg h-[600px] w-[400px] pt-[50px] bg-white">
                <div className="flex flex-col items-center">
                  <div className="">
                    <img className="object-fill w-[250px] flex justify-center" alt="flourish logo" src={require("./../imgs/logo.png")}></img>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-jet
                      text-center">Username or Email</label>
                    <input type="text" id="username" className="pl-[0.5em] bg-palelime border border-jet text-jet
                      text-sm rounded-2xl block w-[320px] h-[2.5em] text-center" placeholder="" required
                      value={username}
                      onChange={handleInputChange(setUsername)}
                      />
                  </div>
                  <div className="flex flex-col items-center justify-center mt-[10px]">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-jet
                      text-center">Password</label>
                    <input type="text" id="password" className="pl-[0.5em] bg-palelime border border-jet text-jet
                      text-sm rounded-2xl block w-[320px] h-[2.5em] text-center" placeholder="" required
                      value={password}
                      onChange={handleInputChange(setPassword)}
                      />
                  </div>
                  <div>
                    <a className="text-jet hover:text-coral text-sm" href="http://localhost:3000/signup">Don't Have An Account? Register!</a>
                  </div>
                  <div>
                    <button className="mt-[30px] bg-russian text-white rounded-lg block w-[200px] h-[2em]
                    hover:bg-coral" 
                    type="button"
                    onClick={sendCreds}
                    >Submit</button>
                    <p className="text-sm text-jet text-center">{"Username Submitted: " + auth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}