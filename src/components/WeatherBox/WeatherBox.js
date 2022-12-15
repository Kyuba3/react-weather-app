import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    
    setError(false)
    setPending(true);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9a0bf97a4a97bd061c46760934d340dd&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {

            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
       
            setPending(false);
            setWeather(weatherData);
          })
      } else {
          setError(true);
        } 
    });
  
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary {...weather} /> }
      {pending && !error && <Loader /> }
      {error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;