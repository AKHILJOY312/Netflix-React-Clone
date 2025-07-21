import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_key } from "../../constants";
import "../../styles/Wishlist.css";
import Navbar from "../layout/Navbar";
import WishlistCard from "../features/WishlistCard";

const Wishlist = () => {
  const [wishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const moviePromises = wishlist.map((id) =>
          axios
            .get("https://www.omdbapi.com/", {
              params: { i: id, apikey: Api_key },
            })
            .then((res) => res.data)
        );
        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      } catch (err) {
        console.error("Error fetching wishlist movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (wishlist.length > 0) {
      fetchMovies();
    } else {
      setIsLoading(false);
    }
  }, [wishlist]);

  return (
    <>
      <Navbar />
      <div className="whishList-Frame">
        <h3 className="title">My List</h3>
        <div className="wishlist-container">
          {movies.map((movie) => (
            <WishlistCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
