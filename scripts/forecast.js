// for interactions with the weather api

const key = 'SDmodUZbSonCe3dS5cLEpcZPJrGDoJfB';
// get weather information
const getWeather = async (locKey) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/${locKey}`;
    const query = `?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get city information
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'; // url where we send the request
    const query = `?apikey=${key}&q=${city}`; // filling up the form, query parameters - ? then &

    const response = await fetch(base + query);
    const data = await response.json(); // .json() returns a promise

    return data[0]; // if many cities with the same name, returns the closest one
};

