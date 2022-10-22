import React, { useEffect, useState } from 'react';
import "./Style.css"

const Temprature = () => {

    const [searchvalue, setsearchvalue ] = useState("Greater Noida");
    const [latestweather, setlatestweather ] = useState("");
    const [weatherstatetype, setweatherstatetype ] = useState("");

    const getweatherinfo = async() =>{
        try {
            let geturl = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=9646a5dc872d1f54bd9a50313bdfcf3e`;
            const res = await fetch(geturl);
            const data = await res.json();

            const {temp,pressure,humidity} = data.main;
            const {name} = data;
            const {main:weathertype} = data.weather[0];
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            // console.log(data)

            const neweatherinfo = {
                temp,
                pressure,
                humidity,
                name,
                weathertype,
                speed,
                country,
                sunset
            };
            setlatestweather(neweatherinfo);

            let senset = latestweather.sunset;
            let date = new Date(senset * 1000);
            let sectime = `${date.getHours()}:${date.getMinutes()}`

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {getweatherinfo()},[])  

    useEffect(()=>{
        if (latestweather.weathertype) {
            switch (latestweather.weathertype) {
                case "clouds":
                    setweatherstatetype("wi-day-cloudy");
                    break;

                case "Haze":
                    setweatherstatetype("wi-fog");
                    break;

                case "clear":
                    setweatherstatetype("wi-day-sunny");
                    break;
                            
                case "Mist":
                    setweatherstatetype("wi-dust");
                    break;

                case "Rain":
                    setweatherstatetype("wi-night-rain");
                    break;

                case "Thunderstorm":
                    setweatherstatetype("wi-thunderstorm");
                    break;
            
                default:
                    setweatherstatetype("wi-day-sunny");
                    break;
            }
        }
    },[latestweather.weathertype])

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type="serach" id="serach" placeholder="Search..." className="searchTerm" value={searchvalue} onChange={(e)=>setsearchvalue(e.target.value)}/>
            <button className="searchButton" type="button" onClick={getweatherinfo}>Search</button>
        </div>
      </div>
        {/* teamprature start */}

            <article className='widget'>
                <div className="weatherIcon">
                    <i className={`wi ${weatherstatetype} `}></i>
                </div>
                <div className="weatherInfoBox">
                    <div className="weatherInfo">
                        <div className="temperature">
                            <span>{latestweather.temp}&deg;</span>
                        </div>

                        <div className="description">
                            <div className="weatherCondition">{latestweather.weathertype}</div>
                            <div className="place">
                            {latestweather.name}, {latestweather.country}
                            </div>
                        </div>
                    </div>
                    <div className='date'>{new Date().toLocaleString() }</div>                
                </div>

                {/* our 4column section  */}
                <div className="extra-temp">
                <div className="temp-info-minmax">
                    <div className="two-sided-section">
                    <p>
                        <i className={"wi wi-sunset"}></i>
                    </p>
                    <p className="extra-info-leftside">
                        {latestweather.sunset} <br />
                        Sunset
                    </p>
                    </div>

                    <div className="two-sided-section">
                    <p>
                        <i className={"wi wi-humidity"}></i>
                    </p>
                    <p className="extra-info-leftside">
                        {latestweather.humidity} <br />
                        Humidity
                    </p>
                    </div>
                </div>

                <div className="weather-extra-info">
                    <div className="two-sided-section">
                    <p>
                        <i className={"wi wi-rain"}></i>
                    </p>
                    <p className="extra-info-leftside">
                        {latestweather.pressure} <br />
                        Pressure
                    </p>
                    </div>

                    <div className="two-sided-section">
                    <p>
                        <i className={"wi wi-strong-wind"}></i>
                    </p>
                    <p className="extra-info-leftside">                        
                        {latestweather.speed} <br />
                        Speed
                    </p>
                    </div>
                </div>
                </div>
            </article>


        {/* teamprature end */}
    </>
  )
}

export default Temprature;
