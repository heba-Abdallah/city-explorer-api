'use strict';

require('dotenv').config();
const express = require('express');
const cityData = require('./data/weather.json')
const cors = require('cors');


const server = express();
server.use(cors());
// const PORT = 3001;
const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.send('home');
})


// http://localhost:3001/getLocation?city_name=Amman
server.get('/getLocation', (req, res) => {
    console.log(req.query);
    let cityNameData = req.query.city_name;
    let late=req.query.lat;
    let long=req.query.lon;
    let dataCity = cityData.find(item => {
        if (item.city_name == cityNameData){
            return item
        }
    })
    res.send(dataCity);
})

server.get('*', (req, res) => {
    res.status(500).send('Not Found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})