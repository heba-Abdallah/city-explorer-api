'use strict';

require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json')
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
const axios = require('axios');

server.use(cors());

server.get('/', (req, res) => {
    res.send('home');
})

const moviehandler = require('./modules/movie')
server.get('/movie', moviehandler);

const weatherhandler = require('./modules/weather')
server.get('/weather', weatherhandler);


///////////////////////////////
// class Forecast {
//     constructor(item) {
//         this.date = item.valid_date;
//         this.description = item.weather.description;
//     }
// }

// async function weatherhandler(req, res) {
//     let key = process.env.WEATHER_API_KEY;

//     let cityName = req.query.city_name;

//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName},NC&key=${key}&days=4`;

//     try{

//     let result = await axios.get(url)
//             let locationArr = searchQuery.data.data.map(item => {
//                 return new Forecast(item);
//             })
//             res.send(locationArr);
//         }

//         catch(errors) {
//             res.status(500).send('error: the informition that you searched for it are not found', errors);
//         }
//     }

//     class Formovie {
//         constructor(item) {
//             this.title = item.original_title;
//             this.overview = item.overview;
//             this.avgVotes = item.vote_average;
//             this.totalVotes = item.vote_count;
//             this.imagePath = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
//             this.popularity = item.popularity;
//             this.releaseDate = item.release_date;
//         }
//     }

//     function moviehandler(req, res) {
//         let key1 = process.env.MOVIE_API_KEY;
//         let city = req.query.searchQuery;

//         let url = `https://api.themoviedb.org/3/search/movie?api_key=${key1}&query=${city}&page=1`;

//         axios.get(url)
//             .then(found => {
//                 const movieArr=found.data.results.map(element =>{
//                     return new Formovie(element);
//                 })
//                 res.send(movieArr);
//             })

//             .catch(error =>{
//                 console.log(error);
//                 res.status(500).send('error: the informition that you searched for it are not found', errors);
//             })
//     }


server.get('*', (req, res) => {
    res.status(404).send('Not Found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

    /////////////////////
//      // http://localhost:3001/getLocation?city_name=Amman
//     // server.get('/getLocation', (req, res) => {
//     //             console.log(req.query);

//     //             let searchQuery = weatherData.find(item => {
//     //                 if (item.city_name.toLocaleLowerCase() == cityName.toLocaleLowerCase()) {
//     //                     return item;
//     //                 }
//     //             })
//     //             console.log(searchQuery);

//     //             try {
//     //                 let locationArr = searchQuery.data.map(item => {
//     //                     return new Forecast(item);
//     //                 })

//     //                 res.send(locationArr);
//     //             }
//     //             catch (errors) {
//     //                 res.status(500).send('error: the informition that you searched for it are not found');
//     //             }
//     //         })