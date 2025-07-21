import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import "../../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { movie } = location.state || {};
  const [videoKeys, setVideoKeys] = useState([]);
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);

  const [wishlist, setWishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );
  const navigate = useNavigate();

  const opts = {
    height: "450",
    width: "100%",
    playerVars: { autoplay: 0 },
  };

  useEffect(() => {
    const fetchYouTubeTrailers = async () => {
      try {
        setIsTrailerLoading(true);
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: import.meta.env.VITE_YOUTUBE_API_KEY,
              part: "snippet",
              q: `${movie?.Title} official trailer`,
              maxResults: 1,
              type: "video",
              videoEmbeddable: "true",
            },
          }
        );

        const videoIds = response.data.items.map((item) => item.id.videoId);
        setVideoKeys(videoIds);
      } catch (error) {
        console.error("Error fetching trailers from YouTube:", error);
      } finally {
        setIsTrailerLoading(false);
      }
    };

    if (movie?.Title) fetchYouTubeTrailers();
  }, [movie]);

  const addToWishlist = () => {
    const updatedWishlist = [...wishlist, id];
    const uniqueWishlist = Array.from(new Set(updatedWishlist));
    setWishlist(uniqueWishlist);
    localStorage.setItem("wishlist", JSON.stringify(uniqueWishlist));
  };

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {isTrailerLoading ? (
        <div className="spinner" />
      ) : (
        videoKeys.length > 0 && (
          <div className="video-section">
            {videoKeys.map((key) => (
              <YouTube key={key} videoId={key} opts={opts} />
            ))}
          </div>
        )
      )}

      <div className="details-content-wrapper">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
          alt={movie.Title}
          className="movie-poster"
        />

        <div className="details-info">
          <div className="details-header">
            <h1 className="details-title">{movie.Title}</h1>
            <button
              className="wishlist-button"
              onClick={addToWishlist}
              disabled={wishlist.includes(id)}
            >
              {wishlist.includes(id) ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <p>
            <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Released:</strong> {movie.Released}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Cast:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Awards:</strong> 🏆 {movie.Awards}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Production:</strong> {movie.Production}
          </p>
          <p>
            <strong>Box Office:</strong> 💰 {movie.BoxOffice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
