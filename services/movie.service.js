const Movie = require('../models/movie');
const { notFound, unauthorized } = require('../utils/apiError');
const { successResponse } = require('../utils/apiResponse')

/* MovieService */

createMovie = async (req, res, next) => {
    try {
        const body = req.body;
        body.createdBy = req.user.id;
        body.modifiedBy = req.user.id;
        const movie = await Movie.create(body);
        return res.status(201).json({ data: "Movie created successfully" })
    }
    catch(err) {
        next(err)
    }
}

getMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id })
        if(!movie)
            throw new Error("Movie not found") 
        res.status(200)
            .json({ data: movie })
    }
    catch(e) {
        next(e)
    }
}

getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find({})
        res.status(200)
            .json({ data: movies })
    }
    catch(e) {
        next(e)
    }
}


deleteMovie = async (req, res, next) => {
    try {
        await Movie.deleteOne({ _id: req.params.id })
        return res.status(204).json({})
    }
    catch(e) {
        next(e)
    }
}


updateMovie = async (req, res, next) => {
    try {
        const body = req.body;
        delete body.name;
        body.modifiedBy = req.user.id

        await Movie.findOneAndUpdate({ _id: req.params.id },  req.body )
        return res.status(204).json({})
    }
    catch(e) {
        next(e)
    }
}

searchMovie = async (req, res, next) => {
    try {
        console.log(" req query ", req.query)
        let genre = [];
        const sortBy = {}
        let genreQuery;
        if(req.query.genre){
            if(typeof req.query.genre == 'string') {
                genre.push(req.query.genre)
                genreQuery = { genre: { $in: genre } }
            }
        }
        else {
            genreQuery = { genre: { $exists: true, $ne:[] } } 
        }
        console.log(" genre ", genre)
        console.log(" genre Query ", genreQuery)
        if(req.query.sortBy){
            sortBy[req.query.sortBy] = 1;
        }
        else 
            sortBy["name"] = 1;
        console.log(" sort ", sortBy)

        const movies = await Movie.aggregate([
            { $match: { $and: [ { $text: {$search: req.query.text} } , genreQuery ]} },
            { $sort: sortBy }
        ])
        return res.status(200).json({ data: movies })
    }
    catch(e) {
        next(e)
    }
}

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    searchMovie
}