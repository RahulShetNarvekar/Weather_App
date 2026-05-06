import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const search = async (city)=>{
      if(city === ""){
        alert("Enter City Name");
        return;
      }
        try{
            const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}&aqi=yes`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
              alert(data.message);
              return;
            }

            console.log(data);
            setWeatherData({
              humidity: data.current.humidity,
              windSpeed: data.current.wind_kph,
              temperature: Math.floor(data.current.temp_c),
              location: data.location.name,
              icon: data.current.condition.icon,
              description: data.current.condition.text
            })
        } catch (error) {
            setWeatherData(false);
            console.log("Error in fetching weather data");
        }
    }

    useEffect(()=>{
        search("Ponda");
    },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
      <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="description">{weatherData.description}</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      
      </>:<></>}
    </div>
  )
}

export default Weather
