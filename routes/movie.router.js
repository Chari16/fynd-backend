const express = require('express')
const movieController = require('../controllers/movie.controller');
const auth = require('../middlewares/auth');
const { checkRole } = require('../utils/auth');
const validate = require('../middlewares/requestValidator');
const schemas = require('../validations/movie'); 

const router = express.Router()

/* Movie Routes */

// search movie
router.get('/search', movieController.searchMovie)

// create movie
router.post('',auth, checkRole("admin"), validate(schemas.movie, 'body'), movieController.createMovie)

// get all movies
router.get('', movieController.getMovies)

// get a movie
router.get('/:id', auth, checkRole("admin"), movieController.getMovie)

// update a movie
router.put('/:id', auth, checkRole("admin"), validate(schemas.movie, 'body'), movieController.updateMovie)

// delete a movie
router.delete('/:id', auth, checkRole("admin"), movieController.deleteMovie)



module.exports = router;
