'use strict';
const express = require('express');         //express library exports a single function so the 
//const express is a function, and will be called to create a new application
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherStack = require('./utils/weather-stack');


const app = express();      //to be called a single time to generate an express application
const port = process.env.PORT || 3000;
//all the directory path for exress
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//for template engine
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsPath);

//for static file 
app.use(express.static(publicDirPath));


app.get('', (req, res) => {         //get lets us configure what a server should do when some one tries to get something from a spacific url
    res.render('index', {
        title: 'Weather',
        author: 'Nikhil Sahu'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'advance weather app help page',
        title: 'Help',
        author: 'Nikhil Sahu'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Nikhil Sahu'
    });
});



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "[ERROR] Location is expected!"
        });
    }
    const address = req.query.address;
    geocode.encode(address, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        } else {
            weatherStack.forecast(data.latitude, data.longitude, (error, weatherData) => {
                if (error) {
                    return res.send({
                        error
                    });
                } else {
                    return res.send({
                        geocodeData: data,
                        weatherData
                    });
                }
            });
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        message: 'Help article not found',
        title: '404',
        author: 'Nikhil Sahu'
    });
});

app.get('*', (req, res) => {
    res.render('404-page', {
        message: 'Page not found',
        title: '404',
        author: 'Nikhil Sahu'
    });
});


app.listen(port, () => {
    console.log(`server is up on port ${port}.`);
});