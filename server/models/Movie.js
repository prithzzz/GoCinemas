import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
    {
        _id: {type: String, reguired: true},
        title: {type: String, reguired: true},
        overview: {type: String, reguired: true},
        poster_path: {type: String, reguired: true},
        backdrop_path: {type: String, reguired: true},
        release_date: {type: String, reguired: true},
        tagline: {type: String},
        genres: {type: Array, required: true},
        vote_average: {type: Number, required: true},
        runtime: {type: Number, required: true}
    }, {timestamps: true}
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie