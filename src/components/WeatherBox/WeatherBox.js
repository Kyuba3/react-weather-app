import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');

  const handleCityChange = useCallback((cityName) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9a0bf97a4a97bd061c46760934d340dd&units=metric`)
     .then(res => res.json())
     .then(data => {

       const weatherData = {
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      };

       setWeather(weatherData);
     });
  },[]);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary weather={weather}/>
      <Loader />
    </section>
  )
};

export default WeatherBox;