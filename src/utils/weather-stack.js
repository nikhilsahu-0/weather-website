const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a73a7b21a5078a672bbe8fedb1ce6af5&query=${lat},${lon}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("[ERROR]Can't connect to the network", undefined);
        } else if (response.body.error) {
            callback("[ERROR]Can't find the location's weather.", undefined);
        } else {
            callback(undefined, {
                time: response.body.location.localtime,
                temperature: response.body.current.temperature,
                wind_speed: response.body.current.wind_speed,
                weather_descriptions: response.body.current.weather_descriptions[0]
            });
        }
    });
};

module.exports = {
    forecast: forecast
}