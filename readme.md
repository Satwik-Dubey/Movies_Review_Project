
#  Movie Review Database

> **Tech Stack:** Node.js, Express.js, MongoDB, Mongoose, Python (for dataset import)

---

##  Project Overview

The **Movie Review Database** is a full-stack backend project built using **Express.js** and **MongoDB**.
It manages movies, genres, and user reviews — demonstrating **one-to-many relationships**, **aggregation**, and **text search indexing**.

This project uses the **IMDb 50K Movie Reviews Dataset** from Kaggle and imports it into MongoDB using a Python script.

---

##  Goals & Skills Demonstrated

| Concept                         | Description                                                         |
| ------------------------------- | ------------------------------------------------------------------- |
|  **One-to-Many Relationship** | One movie can have many reviews (via ObjectId references).          |
|  **Text Indexing**            | Enables text-based search on movie titles and genres.               |
|  **Aggregation**              | Calculates average ratings per movie using MongoDB pipelines.       |
|  **Data Modeling**            | Proper schema design using Mongoose for Movie & Review collections. |
|  **Backend Development**      | RESTful APIs built with Express.js and tested with Postman.         |

---

##  Folder Structure

```
movie-review-db/
│
├── server.js                  # Entry point
├── .env                       # Environment variables
├── package.json               # Node dependencies
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── movieController.js     # Movie CRUD, search, aggregation
│   └── reviewController.js    # Review CRUD
├── models/
│   ├── movie.js               # Movie schema
│   └── review.js              # Review schema
├── routes/
│   ├── movieRoutes.js         # /api/movies routes
│   └── reviewRoutes.js        # /api/reviews routes
├── import_imdb_dataset.py     # Python script to import Kaggle dataset
└── README.md
```

---

##  Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Satwik-Dubey/movie-review-db.git
cd movie-review-db
```

### Install Node Dependencies

```bash
npm install
```

### Setup MongoDB (Local)

Ensure MongoDB is installed and running locally:

```bash
brew services start mongodb-community@8.0
```

Check connection:

```bash
mongosh
```

###  Setup Environment Variables

Create a `.env` file:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/moviereview
PORT=3000
```

---

##  Run the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

##  Import IMDb Dataset (Python Script)

### Install Python Libraries:

```bash
python3 -m pip install pandas pymongo
```

### Run Import Script:

```bash
python3 import_imdb_dataset.py
```

Output:

```
 Dataset loaded successfully!
 Data import complete!
Inserted 1000 movies and reviews into MongoDB.
```

---

## MongoDB Text Index Setup

Run in `mongosh`:

```bash
use moviereview
db.movies.createIndex({ title: "text", genre: "text" })
```

 This enables text search on movie titles and genres.

---

##  API Endpoints

| Method | Endpoint                          | Description                |
| ------ | --------------------------------- | -------------------------- |
| `POST` | `/api/movies`                     | Add a new movie            |
| `GET`  | `/api/movies`                     | Get all movies             |
| `GET`  | `/api/movies/search?query={term}` | Search by title or genre   |
| `GET`  | `/api/movies/ratings/average`     | Average rating aggregation |
| `POST` | `/api/reviews`                    | Add a review for a movie   |

---

##  Example API Usage

### ➕ Add Movie

**POST** `/api/movies`

```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "year": 2010
}
```

###  Search Movie

**GET** `/api/movies/search?query=sci-fi`

###  Average Ratings

**GET** `/api/movies/ratings/average`

---

##  Aggregation Output Example

```json
[
  {
    "_id": "673acb92e12345abc678def0",
    "avgRating": 4.5,
    "count": 5,
    "movieDetails": [
      {
        "title": "Inception",
        "genre": "Sci-Fi",
        "year": 2010
      }
    ]
  }
]
```

---

##  Add-On Features

 **Text Search**: Implemented using MongoDB `$text` index for title and genre fields.
 **Aggregation**: Calculates average rating and review count per movie.
 **Data Import**: Python script loads 1000+ IMDb reviews from Kaggle dataset.

---

## 🧑‍💻 Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB (Community 8.0)**
* **Mongoose ODM**
* **Postman** (for API testing)
* **Python + Pandas + PyMongo** (for dataset import)

---

##  Learnings & Outcomes

* Designed efficient MongoDB schemas for relational data.
* Implemented indexing for text-based search queries.
* Built aggregation pipelines for analytics.
* Integrated Python and Node.js to build an end-to-end data-driven backend.

---

##  Project By:

**Satwik Dubey**


