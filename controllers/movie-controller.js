const { validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user-model');
const Movie = require('../models/movie-model');

// CREATE MOVIE 
const createMovie = async (req, res) => {};

// GET MOVIE BY ID 
const getMovieById = async (req, res) => {};

// GET ALL MOVIES 
const getAllMovies = async (req, res) => {};

// UPDATE MOVIE 
const updateMovie = async (req, res) => {};

// DELETE MOVIE 
const deleteMovie = async (req, res) => {};

module.exports = {
    createMovie,
    getMovieById,
    getAllMovies,
    updateMovie,
    deleteMovie
};