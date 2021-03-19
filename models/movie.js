const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Movie Schema
const movieSchema = new Schema(
	{
		'99popularity': { type: Number },
        director: {
            type: String
        },
        genre: {
            type: Array
        },
        imdb_score: {
            type: Number
        },
        name: {
            type: String
        },
        createdBy: {
            type: Schema.Types.ObjectId
        },
        modifiedBy: {
            type: Schema.Types.ObjectId
        }
	},
	{ timestamps: true },
);

movieSchema.index({'$**': 'text'});

const Movie = mongoose.model('movies', movieSchema)
module.exports = Movie