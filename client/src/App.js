import React from "react";
import logo from "./logo.svg";
import "./App.css";

function dirFromAngle(ori, cardinal){
  if ((ori >= 360 - cardinal  && ori <= 360)|| (ori <= cardinal && ori >= 0)){return "N";}
  else if (ori > cardinal && ori < 90 - cardinal){return "NE";}
  else if(ori >= 90 - cardinal && ori <= 90 + cardinal){return "E";}
  else if(ori > 90 + cardinal && ori < 180 - cardinal){return "SE";}
  else if(ori >= 180 - cardinal && ori <= 180 + cardinal){return "S";}
  else if(ori > 180 + cardinal && ori < 270 - cardinal){return "SW";}
  else if(ori >= 270 - cardinal && ori <= 270 + cardinal){return "W";}
  else if(ori > 270 + cardinal && ori < 360 - cardinal){return "NW";}
  else{return "";}
}

function tempMod(temp, digits){
  let intVal = +parseFloat((Number(temp)-273)).toFixed(digits);
  return intVal + "°";
}

function dateProcess(time, full=false){
  if (full){
    return new Date(time*1000).toLocaleString();
  }
  return new Date(time*1000).toLocaleTimeString();
}

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((e) => {console.log(e)});
  }, []);

  let weather;

  if (data){
    weather = {
      loading: false,
      loc: !data.name ? "Unknown" : data.name,
      retrieved: !data.dt ? "Unknown" : dateProcess(data.dt, true),
      temp: !data.main.temp ? "Unknown" : tempMod(data.main.temp, 0),
      temp_fl: !data.main.feels_like ? "Unknown" : tempMod(data.main.feels_like, 0),
      wtype: !data.weather[0].main ? "Unknown" : data.weather[0].main,
      wind: (!data.wind.speed || !data.wind.deg) ? "0 km/h []" : parseFloat(data.wind.speed * 3.6).toFixed(0)
       + " km/h [" + dirFromAngle(data.wind.deg, 20) + "]",
      wind_gust: !data.wind.gust ? "0 km/h" : parseFloat(data.wind.gust * 3.6).toFixed(0) + " km/h",
      humidity: !data.main.humidity ? "0%" : data.main.humidity + "%",
      pressure: !data.main.pressure ? "0 kPa" : data.main.pressure/10.0 + " kPa", //?? 
      visibility: !data.visibility ? "0 km" : parseFloat(data.visibility/1000.0).toFixed(1) + " km", //this is broken
      sunrise: !data.sys.sunrise ? "Unknown" : dateProcess(data.sys.sunrise), 
      sunset: !data.sys.sunset? "Unknown" : dateProcess(data.sys.sunset)};
  }
  else{
    weather = {
      loading:true};
    }

  console.log(weather);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div class = "jost">
        {!weather.loading &&
          <>
          <p class="header"><b>{weather.loc}</b></p>
          <p class="para-white">Retrieved on {weather.retrieved}</p>
          <p class="weather-main">{weather.temp}</p>
          <p class="para-white"><i>Feels Like</i></p>
          <p class="weather-sub">{weather.temp_fl}</p>
          <p class="para-white">{weather.wtype}</p>
          <p class="para-blue">Wind<span class="para-white" style={{marginLeft:"200px"}}>{weather.wind}</span></p>
          <p class="para-blue">Wind Gust<span class="para-white" style={{marginLeft:"200px"}}>{weather.wind_gust}</span></p>
          <p class="para-blue">Humidity<span class="para-white" style={{marginLeft:"200px"}}>{weather.humidity}</span></p>
          <p class="para-blue">Pressure<span class="para-white" style={{marginLeft:"200px"}}>{weather.pressure}</span></p>
          <p class="para-blue">Visibility<span class="para-white" style={{marginLeft:"200px"}}>{weather.visibility}</span></p>
          <p class="para-blue">Sunrise<span class="para-white" style={{marginLeft:"200px"}}>{weather.sunrise}</span></p>
          <p class="para-blue">Sunset<span class="para-white" style={{marginLeft:"200px"}}>{weather.sunset}</span></p></>}
        {weather.loading &&
        <><h1>Loading information...</h1></>}
        </div>
      </header>
    </div>
  );
}

export default App;