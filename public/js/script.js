'use strict';
const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('.msg-1');
const messageTwo = document.querySelector('.msg-2');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    messageTwo.textContent = '';
    messageOne.textContent = 'Loading...';

    fetch(`http://localhost:3000/weather?address=${input.value}`).then((res) => {
        res.json().then((res) => {
            if (res.error) {
                messageOne.textContent = res.error;

                // console.log('error')
            }
            else {
                const geocodeData = res.geocodeData;
                const weatherData = res.weatherData;
                messageOne.textContent = `${geocodeData.location} , ${weatherData.time} (IST)`;
                messageTwo.textContent = `It is expected to be ${weatherData.weather_descriptions} today. Temperature is currently ${weatherData.temperature} outside with a wind speed of ${weatherData.wind_speed}.`;
                // console.log('data');
            }
        })
    });
});