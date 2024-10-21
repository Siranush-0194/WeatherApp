import React from "react";

const CurrentWeather = ({weather,city}) => {
    const iconURL= `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return (
        <div>
            <h2>Current Weather in {city}</h2>
            <p> Temperature: {weather.main.temp}°</p>
            <p>{weather.weather[0].description}</p>
            <img src={iconURL} alt="Weather icon"/>
        </div>
    );
};

export default CurrentWeather;