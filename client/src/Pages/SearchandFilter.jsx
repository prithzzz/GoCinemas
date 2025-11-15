import React, { useState, useMemo } from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../Components/MovieCard";
import BlurCircle from "../Components/BlurCircle";
import { ChevronRight } from "lucide-react";
import "./SearchAndFilter.css";

const SearchAndFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Extract unique genres & languages
  const genres = useMemo(() => {
    const list = new Set();
    dummyShowsData.forEach((m) =>
      m.genres.forEach((g) => list.add(g.name))
    );
    return [...list];
  }, []);

  const languages = useMemo(() => {
    const list = new Set(dummyShowsData.map((m) => m.original_language));
    return [...list];
  }, []);

  // Combined filtering
  const filteredMovies = dummyShowsData.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre = selectedGenre
      ? movie.genres.some((g) => g.name === selectedGenre)
      : true;

    const matchesLanguage = selectedLanguage
      ? movie.original_language === selectedLanguage
      : true;

    return matchesSearch && matchesGenre && matchesLanguage;
  });

  return (
    <div className="sf-container">
      {/* Background blur effects */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      {/* Search Bar */}
      <div className="sf-search-bar">
        <span className="sf-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* GENRE SECTION */}
      <div className="sf-section">
        <p className="sf-section-title">Search By Genre</p>
        <div className="sf-scroll-row">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`sf-chip ${
                selectedGenre === genre ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedGenre(selectedGenre === genre ? "" : genre)
              }
            >
              {genre}
            </button>
          ))}
          <button className="sf-scroll-btn">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* LANGUAGE SECTION */}
      <div className="sf-section">
        <p className="sf-section-title">Search By Language</p>
        <div className="sf-scroll-row">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`sf-chip ${
                selectedLanguage === lang ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedLanguage(selectedLanguage === lang ? "" : lang)
              }
            >
              {lang.toUpperCase()}
            </button>
          ))}
          <button className="sf-scroll-btn">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* TRENDING MOVIES */}
      <div className="sf-section">
        <p className="sf-section-title">Trending Movies</p>
        <div className="sf-movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard movie={movie} key={movie._id} />
            ))
          ) : (
            <p className="sf-no-results">No movies found.</p>
          )}
        </div>

        <button className="sf-scroll-btn-floating">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
