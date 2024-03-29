import './App.css';
import React, {useState} from "react";

const api = {
    key: "8953830b37c8d552db1cc0c9753c2380",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = event =>{
        if(event.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }
    function dateBuilder(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'App warm' : 'App') : 'App'}>
      <main>
          <div className="search-box">
              <input type="text"
                     className="search-bar"
                     placeholder="Search something"
                     onChange={e => setQuery(e.target.value)}
                     value={query}
                     onKeyPress={search}
              />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
                <div className="information-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">{Math.round(weather.main.temp)}°C</div>
                    <div className="weather-cur">{weather.weather[0].description}</div>
                </div>
            </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
