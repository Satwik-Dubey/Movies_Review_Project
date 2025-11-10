import Review from "../models/review.js";
import Movie from "../models/movie.js";

// Add a review to a movie
export const createReview = async (req, res) => {
  try {
    const { movieId, user, rating, comment } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const review = new Review({ movie: movieId, user, rating, comment });
    await review.save();

    movie.reviews.push(review._id);
    await movie.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
