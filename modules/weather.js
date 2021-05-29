const axios = require('axios');

module.exports = weatherhandler;

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `low of ${item.min_temp}, hight of${item.max_temp} with ${item.weather.description}`;
    }
}

let inmemory = {};

function weatherhandler(req, res) {
    let key = process.env.WEATHER_API_KEY;

    let cityName = req.query.city_name;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName},NC&key=${key}&days=4`;

    axios
        .get(url)
        .then(found => {

            const locationArr = found.data.data.map(item => {
                return new Forecast(item);
            })
            inmemory[cityName] = locationArr;
            res.send(locationArr);
        })

        .catch(errors => {
            res.status(500).send('error: the informition that you searched for it are not found', errors);
        })

}

