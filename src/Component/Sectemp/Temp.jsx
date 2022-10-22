import React, { useEffect, useState } from 'react';
import '../Style.css'
import Weather from "./weather";

const Temp = () => {

const [searchvalue, setsearchvalue] = useState('Delhi');
const [getdatavalue, setgetdatavalue] = useState({})

const getsearchvalue = async() => {

    try {
        
        let weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=9646a5dc872d1f54bd9a50313bdfcf3e`;
        let data = await (await fetch(weatherurl)).json();
        // let data = await res.json();
    

        const {name} = data;
        const {speed} = data.wind;
        const {country,sunset,sunrise} = data.sys;
        const {temp,pressure,humidity} = data.main;
        const {main:weathertype} = data.weather[0];

        console.log(name)

        const myreqdata = {
            name,
            speed,
            country,
            sunset,
            sunrise,
            temp,
            pressure,
            humidity,
            weathertype
        };
    
        setgetdatavalue(myreqdata)


    } catch (error) {
        console.log(error);
    }

}

useEffect(() =>{
    getsearchvalue();
},[])

  return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input type="serach" id="serach" value={searchvalue} onChange={(e) => setsearchvalue(e.target.value)} placeholder="Search..." className="searchTerm" />
                <button className="searchButton" type="button" onClick={getsearchvalue}>Search</button>
            </div>
        </div>
        {/* weather start */}

           <Weather getdatavalue={getdatavalue}/>

        {/* weather end */}
    </>
  )
}

export default Temp;
