import express from "express";
import {
  createMovie,
  getMovies,
  searchMovies,
  getAverageRatings,
} from "../controllers/movieController.js";

const router = express.Router();

// Add a new movie
router.post("/", createMovie);

// Get all movies
router.get("/", getMovies);

// Search movies by title or genre
router.get("/search", searchMovies);

// Get average rating per movie
router.get("/ratings/average", getAverageRatings);

export default router;
