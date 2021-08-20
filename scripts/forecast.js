// for interactions with the weather api


class Forecast{
    constructor(){
        this.key = 'SDmodUZbSonCe3dS5cLEpcZPJrGDoJfB';
        this.weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/`;
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city); // await to make sure it is finished, returns a promise
        const weather = await this.getWeather(cityDets.Key);
    
        return {    // returning a new object
            cityDets,   // very nice object shorthand notation instead of writing cityDets: cityDets
            weather
        };
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`; // filling up the form, query parameters - ? then &
        const response = await fetch(this.cityURL + query);
        const data = await response.json(); // .json() returns a promise
        return data[0]; // if many cities with the same name, returns the closest one
    }
    async getWeather(locKey){
        const query = `${locKey}?apikey=${this.key}`;    
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();    
        return data[0];
    }
}

