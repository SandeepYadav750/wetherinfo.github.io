import React, { useEffect, useState } from 'react'


const Weather = ({getdatavalue}) => {

const [weathercon, setweathercon] = useState();

    const {
        name,
        speed,
        country,
        sunset,
        sunrise,
        temp,
        pressure,
        humidity,
        weathertype
    } = getdatavalue;

    let sunsetime = sunset;
    let date = new Date(sunsetime * 1000); 
    let settimes = `${date.getHours()}:${date.getMinutes()}`; //${(date>= 12) ? "PM" : "AM"}

    useEffect(() => {
        if (weathertype) {
            switch (weathertype) {
                case "clouds":
                setweathercon("wi-day-cloudy")
                break;
    
                case "Haze":
                setweathercon("wi-fog")
                break;
    
                case "Mist":
                setweathercon("wi-dust");
                break;
    
                case "clear":
                setweathercon("wi-day-sunny")
                break;
    
                case "Rain":
                setweathercon("wi-night-rain")
                break;
    
                case "Thunderstorm":
                setweathercon("wi-thunderstorm");
                break;

                case "Smoke":
                setweathercon("wi-smoke");
                break;
            
                default:
                setweathercon("wi-day-sunny")
                break;
            }
        }
    },[weathertype])

  return (
    <>
       <article className='widget'>
                <div className="weatherIcon">
                    <i className={`wi ${weathercon} `}></i>
                </div>
                <div className="weatherInfoBox">
                    <div className="weatherInfo">
                        <div className="temperature">
                            <span>{temp}&deg;</span>
                        </div>

                        <div className="description">
                            <div className="weatherCondition">{weathertype}</div>
                            <div className="place">
                                {name}, {country}
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
                        {settimes} <br />
                        Sunset
                    </p>
                    </div>

                    <div className="two-sided-section">
                    <p>
                        <i className={"wi wi-humidity"}></i>
                    </p>
                    <p className="extra-info-leftside">
                        {humidity} <br />
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
                        {pressure} <br />
                        Pressure
                    </p>
                    </div>

                    <div className="two-sided-section">
                    <p>
                        <i className={"wi wi-strong-wind"}></i>
                    </p>
                    <p className="extra-info-leftside">                        
                        {speed} <br />
                        Speed
                    </p>
                    </div>
                </div>
                </div>
            </article>
    </>
  )
}

export default Weather;
