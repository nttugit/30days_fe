// Dung axios
// const { data } = await axios.get(url);
const body = document.querySelector('body');
const weatherWrapper = document.querySelector('.weather_wrapper');
const searchInput = document.querySelector('.weather-search');
const city = document.querySelector('.weather-city');
const country = document.querySelector('.weather-country');
const time = document.querySelector('.time');
const temperature = document.querySelector('.temperature .value');
const shortDesc = document.querySelector('.short-desc');
const visibility = document.querySelector('.visibility span');
const windSpeed = document.querySelector('.wind_speed span');
const humidity = document.querySelector('.humidity span');
const weatherContent = document.querySelector('.weather-content');

const WEATHER_API_KEY = 'f3bc65262c20399afe80d07691b72c78'
const TIMEZONE_API_KEY = '2ebf5b0c98844700a6411eb75ad24368'


window.addEventListener('load', async function (e) {
    updateUI("Ho Chi Minh")
})

function updateImagesBasedOnTemperature(temp) {
    if (!temp) return;
    if (temp > 20) {
        body.classList.add('hot_weather_body')
        weatherWrapper.classList.add('hot_weather_wrapper')

        body.classList.remove('cold_weather_body')
        weatherWrapper.classList.remove('cold_weather_wrapper')
    } else {
        body.classList.add('cold_weather_body')
        weatherWrapper.classList.add('cold_weather_wrapper')

        body.classList.remove('hot_weather_body')
        weatherWrapper.classList.remove('hot_weather_wrapper')
    }
}


async function updateUI(searchedPlace) {
    const [weather, timezone] = await Promise.all([
        getWeather(searchedPlace),
        getTime(searchedPlace)
    ])

    if (weather && time) {
        updateImagesBasedOnTemperature(weather.temperature)
        weatherContent.classList.remove('hide');

        city.innerText = weather.city;
        country.innerText = weather.countryCode;
        time.innerText = timezone;
        shortDesc.innerText = weather.shortDesc;
        visibility.innerText = weather.visibility + " m";
        console.log(weather.visibility, visibility.innerText)
        windSpeed.innerText = weather.windSpeed + " m/s";
        humidity.innerText = weather.humidity + " %";
        temperature.innerHTML = weather.temperature + `<sup>o</sup>C`;
    } else {
        weatherContent.classList.add('hide');

    }
}

searchInput.addEventListener('keypress', async function (e) {
    if (e.keyCode === 13) {
        const searchedPlace = e.target.value.trim();
        await updateUI(searchedPlace)
    }
})

async function getTime(searchedPlace) {
    const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=${TIMEZONE_API_KEY}&location=${searchedPlace}`;
    const data = await (await fetch(url)).json();
    let date = new Date()
    if (date?.datetime) {
        date = data.datetime
    }

    return new Date(date).toLocaleString('en-GB');
}

async function getWeather(searchedPlace) {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}&q=${searchedPlace}`;

    // Dung fetch (node 18)
    const data = await (await fetch(url)).json();
    if (data.cod !== 200) {
        return null;
    }
    return {
        city: data.name,
        countryCode: data.sys.country,
        temperature: (data.main.temp - 273.15).toFixed(0),
        shortDesc: data.weather[0].description,
        visibility: data.visibility,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
    }
}