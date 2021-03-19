const movieService  = require('../services/movie.service');
const { successResponse } = require('../utils/apiResponse');
const validate = require('../middlewares/requestValidator');
const schemas = require('../validations/movie');

createMovie = async (req, res, next) => {
    return await movieService.createMovie(req, res, next)
}

getMovies = async (req, res, next) => {
    return await movieService.getMovies(req, res, next)
}

getMovie = async (req, res, next) => {
    console.log(" my req user ", req.user)
    return await movieService.getMovie(req, res, next);
}

updateMovie = async (req, res, next) => {
    return await movieService.updateMovie(req, res, next);
}

deleteMovie = async (req, res, next) => {
    return await movieService.deleteMovie(req, res, next);
}

searchMovie = async (req, res, next) => {
    return await movieService.searchMovie(req, res, next);
}

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    searchMovie
}