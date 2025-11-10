import pandas as pd
from pymongo import MongoClient


client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["moviereview"]
movies_collection = db["movies"]
reviews_collection = db["reviews"]


csv_path = "/Users/satwikdubey/Documents/Dev/IMDB Dataset.csv"  
df = pd.read_csv(csv_path)


print("Dataset loaded successfully!")
print(df.head())

# Clean data
df.dropna(inplace=True)
df = df.head(1000)  # for sample just to showcase its working

# 5️Insert movies and reviews
for index, row in df.iterrows():
    review_text = row["review"]
    sentiment = row["sentiment"]
    rating = 5 if sentiment == "positive" else 2

    movie_title = f"Movie_{index}" 

    # Insert movie
    movie_doc = {
        "title": movie_title,
        "genre": "Unknown",
        "year": 2020,
        "reviews": []
    }
    movie_id = movies_collection.insert_one(movie_doc).inserted_id

    # Insert linked review
    review_doc = {
        "movie": movie_id,
        "user": f"User_{index}",
        "rating": rating,
        "comment": review_text
    }
    review_id = reviews_collection.insert_one(review_doc).inserted_id

    # Link review to movie
    movies_collection.update_one(
        {"_id": movie_id},
        {"$push": {"reviews": review_id}}
    )

print("Data import complete!")
print(f"Inserted {df.shape[0]} movies and reviews into MongoDB.")
