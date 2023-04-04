import React from "react";
import axios from "axios";
import "./App.css";
import CountrySelect from "./components/countrySearch";

const API = require("./OpenWeatherMapApi.json");

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

  let latitude = "42.984924";
  let longitute = "-81.245277";

  const baseURL =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitute}&appid=${API.key}`;

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
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
      visibility: !data.visibility ? "0 km" : parseFloat(2.4 * data.visibility/1000.0).toFixed(1) + " km", //this is broken
      sunrise: !data.sys.sunrise ? "Unknown" : dateProcess(data.sys.sunrise), 
      sunset: !data.sys.sunset? "Unknown" : dateProcess(data.sys.sunset)};
  }
  else{
    weather = {
      loading:true};
    }

  return (
    <>
      <div id="top-container">
        <CountrySelect />
      </div>
      <div className="App">
        <header className="App-header">
          <div className= "jost">
          {!weather.loading &&
            <>
            <p className="header"><b>{weather.loc}</b></p>
            <p className="para-white">Retrieved on {weather.retrieved}</p>
            <div className="weather-center">
              <p className="weather-main"><b>{weather.temp}</b></p>
              <div className="feelslike">
                <p className="para-white"><i>Feels</i></p>
                <p className="para-white"><i>Like</i></p>
              </div>
              <p className="weather-sub">{weather.temp_fl}</p>
              <img className="weather-img" src={require("./imgs/yikes.png")}></img>
            </div>
            <p className="para-white">{weather.wtype}</p>
            <p className="para-white"><br></br></p>
            <div className="container">
              <div className="subcontainer">
                  <p className="para-blue">Wind</p>
                  <p className="para-white">{weather.wind}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Wind Gust</p>
                  <p className="para-white">{weather.wind_gust}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Humidity</p>
                  <p className="para-white">{weather.humidity}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Pressure</p>
                  <p className="para-white">{weather.pressure}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Visibility</p>
                  <p className="para-white">{weather.visibility}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Sunrise</p>
                  <p className="para-white">{weather.sunrise}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Sunset</p>
                  <p className="para-white">{weather.sunset}</p>
              </div>
            </div></>}
          
          {weather.loading &&
          <><p className="header" style={{textAlign:"center"}}><b>Loading information...</b></p></>}
          </div>
        </header>
      </div>
    </>
  );
}

export default App;