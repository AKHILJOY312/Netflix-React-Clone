import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_key } from "../../constants";
import RowPoster from "../../components/layout/RowPoster";

const genreQueries = {
  Trending: [
    "Dune",
    "Oppenheimer",
    "Barbie",
    "The Batman",
    "Spider-Man: No Way Home",
    "Top Gun: Maverick",
    "Avatar: The Way of Water",
    "The Flash",
    "Mission: Impossible – Dead Reckoning",
    "The Marvels",
  ],
  Action: [
    "John Wick",
    "Mad Max: Fury Road",
    "Extraction",
    "Gladiator",
    "The Dark Knight",
    "Kill Bill",
    "300",
    "The Raid",
    "Atomic Blonde",
    "Nobody",
  ],
  Comedy: [
    "The Hangover",
    "Superbad",
    "Step Brothers",
    "21 Jump Street",
    "Bridesmaids",
    "The Grand Budapest Hotel",
    "Deadpool",
    "The Nice Guys",
    "Tropic Thunder",
    "Anchorman",
  ],
  SciFi: [
    "Interstellar",
    "Inception",
    "The Matrix",
    "Blade Runner 2049",
    "Arrival",
    "Tenet",
    "Edge of Tomorrow",
    "Minority Report",
    "The Martian",
    "Ready Player One",
  ],
  Crime: [
    "Joker",
    "The Godfather",
    "Scarface",
    "The Irishman",
    "Pulp Fiction",
    "The Departed",
    "Goodfellas",
    "No Country for Old Men",
    "Prisoners",
    "Se7en",
  ],
};

const FilmRows = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loadingGenres, setLoadingGenres] = useState(Object.keys(genreQueries));

  useEffect(() => {
    const cachedData = localStorage.getItem("movies_cache");
    let parsedCache = {};

    if (cachedData) {
      parsedCache = JSON.parse(cachedData);
      setMoviesByGenre(parsedCache);
      setLoadingGenres((prev) =>
        prev.filter((g) => !Object.keys(parsedCache).includes(g))
      );
    }

    const fetchGenres = async (genreList) => {
      const newData = {};
      setLoadingGenres((prev) => [...new Set([...prev, ...genreList])]);

      for (const genre of genreList) {
        const titles = genreQueries[genre];
        newData[genre] = [];

        for (const title of titles) {
          try {
            const res = await axios.get("https://www.omdbapi.com/", {
              params: { t: title, apikey: Api_key },
            });
            if (res.data?.Response === "True") {
              newData[genre].push(res.data);
            }
          } catch (err) {
            console.error(`Error fetching ${title}:`, err);
          }
        }
      }

      const updated = { ...parsedCache, ...newData };
      setMoviesByGenre(updated);
      localStorage.setItem("movies_cache", JSON.stringify(updated));
      setLoadingGenres((prev) => prev.filter((g) => !genreList.includes(g)));
    };

    const allGenres = Object.keys(genreQueries);
    const toFetch = allGenres.filter(
      (g) => !Object.keys(parsedCache).includes(g)
    );
    if (toFetch.length > 0) {
      fetchGenres(toFetch);
    }
  }, []);

  return (
    <>
      <div>
        {Object.entries(moviesByGenre).map(([genre, movies]) => (
          <div key={genre} className="row-wrapper">
            <RowPoster
              title={genre}
              data={movies}
              isLoading={loadingGenres.includes(genre)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FilmRows;
