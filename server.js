'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json')
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;

server.use(cors());

// const PORT = 3001;

server.get('/', (req, res) => {
    res.send('home');
})

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}

// http://localhost:3001/getLocation?city_name=Amman
server.get('/getLocation', (req, res) => {
    console.log(req.query);
    let cityName = req.query.city_name;
    // let late=req.query.lat;
    // let long=req.query.lon;
    let searchQuery = weatherData.find(item => {
        if (item.city_name.toLocaleLowerCase() == cityName.toLocaleLowerCase()) {
            return item;
        }
    })
    console.log(searchQuery);

    try {
        let locationArr = searchQuery.data.map(item => {
            return new Forecast(item);
        })

        res.send(locationArr);
    }
    catch (errors){
        res.status(500).send('error: the informition that you searched for it are not found');
    }
})


server.get('*', (req, res) => {
    res.status(404).send('Not Found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})