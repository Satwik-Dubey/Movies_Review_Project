import Movie from "../models/movie.js";
import Review from "../models/review.js";

//Add a new movie
export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("reviews");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Text search for title or genre
// 🔍 Text search for title or genre
export const searchMovies = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Please provide a search query." });
    }

    // MongoDB text search with relevance scoring
    const movies = await Movie.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found matching your search." });
    }

    res.json({
      message: `Found ${movies.length} result(s) for '${query}'`,
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Aggregation: Average ratings per movie
export const getAverageRatings = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: "$movie",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
