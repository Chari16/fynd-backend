const Joi = require('joi') 
const schemas = { 
  movie: Joi.object().keys({ 
    name: Joi.string().required(), 
    director: Joi.string().required(),
    genre: Joi.array().required(),
    imdb_score: Joi.number().required(),
    '99popularity': Joi.number().required()
  })
}; 
module.exports = schemas;