import React from "react";

const HourlyWeather = ({weather,unit}) => {
    return (
        <div>
            <h3>Hourly Forecast</h3>
            <div className="hourly-forecast">
                {weather.slice(0,8).map((item,index) => (
                    <div key={index}>
                        <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
                        <p>{item.main.tem}° {unit === 'metric' ? 'C' : 'F'}</p>
                         </div> 
                ))}
            </div>
        </div>
    );
};

export default HourlyWeather;