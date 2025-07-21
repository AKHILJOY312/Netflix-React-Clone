import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/RowPoster.css";
import fallbackImage from "../../assets/fallback.png";

const RowPoster = ({ title, data, isLoading }) => {
  const navigate = useNavigate();
  const rowRef = useRef(null);

  const handleClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`, { state: { movie } });
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-controls">
        <button onClick={() => scroll("left")}>
          <i className="fa-solid fa-caret-left"></i>
        </button>

        <div className="rowPosters" ref={rowRef}>
          {isLoading
            ? [...Array(10)].map((_, i) => (
                <div key={i} className="poster skeleton" />
              ))
            : data
                ?.slice(0, 10)
                .map((movie) => (
                  <img
                    key={movie.imdbID}
                    className="poster"
                    src={movie.Poster !== "N/A" ? movie.Poster : fallbackImage}
                    alt={movie.Title}
                    onClick={() => handleClick(movie)}
                  />
                ))}
        </div>

        <button onClick={() => scroll("right")}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
    </div>
  );
};

export default RowPoster;
