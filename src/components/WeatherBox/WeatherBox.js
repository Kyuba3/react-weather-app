import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback((cityName) => {

    setPending(true);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9a0bf97a4a97bd061c46760934d340dd&units=metric`)
     .then(res => res.json())
     .then(data => {

       setPending(false);

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
      {weather && !pending && <WeatherSummary {...weather} /> }
      {pending && <Loader /> }
    </section>
  )
};

export default WeatherBox;