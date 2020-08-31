import React, { useState, useEffect } from 'react';
import Form from "./components/Form/Form";
import Weather from "./components/Weather/Weather";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";

const APIKey = 'd37675880fb0485d7198595c581f9d3d';
const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog"
};

const App = () => {
  useEffect(async () => {
    getWeatherInfo('Vienna', 'Austria')
  }, [])

  const [cityName, setCityName] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [main, setMain] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [max, setMax] = useState(null);
  const [min, setMin] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(icons.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(icons.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(icons.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(icons.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(icons.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(icons.Clouds);
        break;
      default:
        setIcon(icons.Clouds);
    }
  }

  const calCelsius = (temp) => {
    return Math.floor(temp - 273.15);
  }

  const submitLocation = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    await getWeatherInfo(city, country);
  };

  const getWeatherInfo = async (city, country) => {
    if (country && city) {
      const apiCall = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${APIKey}`
      );

      const response = await apiCall.json();
      if(response.cod !== '200') { setError(true); return }

      setCityName(`${response.city.name}, ${response.city.country}`)
      setMain(response.list[0]?.weather[0]?.main)
      setCelsius(calCelsius(response.list[0]?.main?.temp))
      setMin(calCelsius(response.list[0]?.main?.temp_min))
      setMax(calCelsius(response.list[0]?.main?.temp_max))
      setFeelsLike(calCelsius(response.list[0]?.main?.feels_like))
      setDescription(response.list[0]?.weather[0]?.description)
      setError(false);
      getWeatherIcon(weatherIcon, response.list[0]?.weather[0]?.id);

    } else {
      setError(true);
    }
  }

  return (
    <div className="App">
      <Form submit={submitLocation} error={error} />
      <Weather
        cityName={cityName}
        icon={icon}
        celsius={celsius}
        max={max}
        min={min}
        description={description}
        feelsLike={feelsLike}
      />
    </div>
  );
}

export default App;
