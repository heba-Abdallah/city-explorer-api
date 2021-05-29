const axios = require('axios');

module.exports = moviehandler;

class Formovie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.avgVotes = item.vote_average;
        this.totalVotes = item.vote_count;
        this.imagePath = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.releaseDate = item.release_date;
    }
}

let inmemory = {};

function moviehandler(req, res) {
    let key1 = process.env.MOVIE_API_KEY;
    let city = req.query.searchQuery;

    if (inmemory[city] !== undefined) {
        console.log('get the data from the Movie Memory');
        res.send(inmemory[city])
    } else {
        console.log('get the data from the Movie API');
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${key1}&query=${city}&page=1`;

        axios.get(url)
            .then(found => {
                const movieArr = found.data.results.map(element => {
                    return new Formovie(element);
                })
                res.send(movieArr);
            })

            .catch(error => {
                console.log(error);
                res.status(500).send('error: the informition that you searched for it are not found', errors);
            })
    }

}