import './App.css';
import Login from './components/login'
import SignUp from './components/signup'
import Garden from './components/garden/garden'

import React from 'react';

function App() {
  //const [authUser, setAuthUser] = React.useState("");

  // const externalSetAuthUser = (data) => {
  //   setAuthUser(data);
  //   console.log(currentUser);
  // }

  function current(suffix, url=":3000/"){
    let processedSuffix = url+suffix;
    return window.location.href.endsWith(processedSuffix) || window.location.href.endsWith(processedSuffix+"/");
  }

  return (
    <div>
      {current("") &&
      <>
        <Login/>
      </>}
      {current("signup") &&
      <>
        <SignUp/>
      </>}
      {current("garden") && 
      <>
        <Garden/>
      </>}
    </div>
  )
}


export default App;
