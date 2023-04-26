import './App.css';
import Login from './components/login'
import SignUp from './components/signup'
import Garden from './components/garden/garden'

import React from 'react';

function App() {
  // function current(suffix, url=":3000/"){
  //   let processedSuffix = url+suffix;
  //   return window.location.href.endsWith(processedSuffix) || window.location.href.endsWith(processedSuffix+"/");
  // }
  const [user, setUser] = React.useState(null);
  const [site, setSite] = React.useState("login")

  return (
    <div>
      {site === "login" &&
      <>
        <Login setSite={setSite} user={user} setUser={setUser}/>
      </>}
      {site === "signup" &&
      <>
        <SignUp setSite={setSite} user={user} setUser={setUser}/>
      </>}
      {site === "garden" && 
      <>
        <Garden setSite={setSite} user={user} setUser={setUser}/>
      </>}
    </div>
  )
}


export default App;
