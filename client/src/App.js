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
      wind: (!data.wind.speed || !data.wind.deg) ? "0 km/h []" : data.wind.speed + " km/h [" + dirFromAngle(data.wind.deg, 20) + "]",
      wind_gust: !data.wind.gust ? "0 km/h" : data.wind.gust + " km/h",
      humidity: !data.main.humidity ? "0%" : data.main.humidity + "%",
      pressure: !data.main.pressure ? "0 kPa" : data.main.pressure/10.0 + " kPa",
      visibility: !data.visibility ? "0 km" : parseFloat(data.visibility/1000.0).toFixed(1) + " km",
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
          <><p>Location: {weather.loc}</p>
          <p>Date Retrieved: {weather.retrieved}</p>
          <p>Temperature: {weather.temp}</p>
          <p>Feels Like: {weather.temp_fl}</p>
          <p>Weather: {weather.wtype}</p>
          <p>Wind: {weather.wind}</p>
          <p>Wind Gust: {weather.wind_gust}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Pressure: {weather.pressure}</p>
          <p>Visibility: {weather.visibility}</p>
          <p>Sunrise: {weather.sunrise}</p>
          <p>Sunset: {weather.sunset}</p></>}
        {weather.loading &&
        <><h1>Loading information...</h1></>}
        </div>
      </header>
    </div>
  );
}

export default App;