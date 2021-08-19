// for all dom manipulation, showing on the page

const cityForm = document.querySelector('.change-location');    // the search bar
const card = document.querySelector('.card'); // big card containing picture + icon + city name + weather condition + temperature
const details = document.querySelector('.details'); // city name + weather condition + temperature
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => { // the object from updateCity()

    // destructure properties
    const {cityDets, weather} = data; // better than writing const cityDets = data.cityDets;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the nigh/day & icon images
    let timeSrc = null;
    timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


const updateCity = async (city) => {

    const cityDets = await getCity(city); // await to make sure it is finished, returns a promise
    const weather = await getWeather(cityDets.Key);

    return {    // returning a new object
        cityDets,   // very nice object shorthand notation instead of writing cityDets: cityDets
        weather
    };
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    console.log(city);
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data)) // the data is the onject returned by updateCity()
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city); // most recent location
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}