import React, { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import Modal from "./components/Modal";
import './App.scss';

const API_KEY = '53e07e4ae83a6478ab4921222295e797';

const App = () => {

  const [weather,setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [city,setCity] = useState('');
  const [searchCity,setSearchCity] = useState('');
  const [showModal,setShowModal] = useState (false);
  const [ selectedDay, setSelectedDay] = useState (0);

  useEffect(() => {
    getCurrentLocationWeather();
  },[unit]);


  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`lat=${latitude}&lon=${longitude}`)
    });
  };

  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?${query}&units=${unit}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === "200") {
        setWeather(data);
        setCity(data.city.name);
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setShowModal(true);
    }
  };
  const handleSwitch = (newUnit) => {
    setUnit(newUnit);
  };

  const  handleSearchChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchCity.trim() !== '') {
      fetchWeatherData(`q=${searchCity}`);
      setSearchCity('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1> Weather App</h1>

      <form onSubmit={handleSearchSubmit} className="search-form"> 
        <input
          type="text"
          placeholder="Enter city"
          value={searchCity}
          onChange={handleSearchChange}
        />
        <button type="submit"> Search </button>
      </form>
      <div className="unit-switch">
        <label>
          <input
            type="radio"
            name="unit"
            value="metric"
            checked={unit === 'metric'}
            onChange={() => handleSwitch('metric')}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={unit === 'imperial'}
            onChange={() => handleSwitch('imperial')}
          />
          Fahrenheit
        </label>
      </div>

      {weather &&  (
        <>
        <CurrentWeather weather={weather.list[0]} city={city} />
        <HourlyWeather weather={weather.list} unit={unit}/>
        <DailyWeather weather={weather.list} selectedDay={selectedDay} onDayChange={setSelectedDay}/>

        </>
      )}
      {showModal && (
        <Modal message = "City not found" onClose ={closeModal}/>
      )}

    </div>

  );
};
export default App;
 