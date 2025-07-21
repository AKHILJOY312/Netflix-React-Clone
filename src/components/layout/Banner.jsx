import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_key } from "../../constants";
import bannerImage from "../../assets/dune-part-two-movie-poster-landscape.jpg";
import "../../styles/Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get("https://www.omdbapi.com/", {
          params: {
            i: "tt15239678",
            apikey: Api_key,
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="content">
        <h1 className="title">{movie?.Title}</h1>
        <div className="banner_button">
          <button className="button">Play</button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">{movie?.Plot}</h1>
      </div>
      <div className="fade"></div>
    </div>
  );
};

export default Banner;
