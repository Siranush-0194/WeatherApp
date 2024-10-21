import React from "react";


const DailyWeather = ({weather,selectedDay, onDayChange}) => {
    const days = weather.reduce((acc,item) => {
        const date = new Date(item.dt *1000).toLocaleDateString();
        if(!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
        },{});

        
        const dayKeys =Object.keys(days);

        return (
            <div>
                <h3> 5-Day Forecast</h3>
                <div className="forecast-days">
                    {dayKeys.map((day,index) => (
                        <button
                        key={index}
                        onClick={() => onDayChange(index)}
                        className={selectedDay === index ? 'actove' : ''}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                    {days[dayKeys[selectedDay]] && (
                        <div>
                            {days [dayKeys[selectedDay]].map((weatherItem, index) => (
                        <div key={index}>
                                <p> {new Date(weatherItem.dt *1000).toLocaleDateString()} - {weatherItem.main.temp}°</p>
                            </div>
                    ))}
            </div>
        )};
        </div>
        );
};


export default DailyWeather;