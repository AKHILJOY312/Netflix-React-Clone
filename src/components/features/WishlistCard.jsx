import React from "react";
import { useNavigate } from "react-router-dom";
//import "../../styles/WishlistCard.css"; // if you want to style the poster

const WishlistCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`, { state: { movie } });
  };

  return (
    <div className="wishlist-card" onClick={handleClick}>
      <img
        className="wishlistPoster"
        src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
        alt={movie.Title}
      />
    </div>
  );
};

export default WishlistCard;
