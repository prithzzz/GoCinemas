import React, { useState, useMemo, useRef, useEffect } from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../Components/MovieCard";
import BlurCircle from "../Components/BlurCircle";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./SearchAndFilter.css";

const SearchAndFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // scroll refs
  const genreRowRef = useRef(null);
  const languageRowRef = useRef(null);

  // visibility for arrows
  const [showLeftGenre, setShowLeftGenre] = useState(false);
  const [showRightGenre, setShowRightGenre] = useState(false);
  const [showLeftLang, setShowLeftLang] = useState(false);
  const [showRightLang, setShowRightLang] = useState(false);

  // Calculate arrow visibility
  const updateArrows = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (!el) return;

    setLeft(el.scrollLeft > 5);

    const maxScroll = el.scrollWidth - el.clientWidth - 5;
    setRight(el.scrollLeft < maxScroll);
  };

  useEffect(() => {
    const genreEl = genreRowRef.current;
    if (!genreEl) return;

    updateArrows(genreRowRef, setShowLeftGenre, setShowRightGenre);

    const handler = () =>
      updateArrows(genreRowRef, setShowLeftGenre, setShowRightGenre);

    genreEl.addEventListener("scroll", handler);
    return () => genreEl.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const langEl = languageRowRef.current;
    if (!langEl) return;

    updateArrows(languageRowRef, setShowLeftLang, setShowRightLang);

    const handler = () =>
      updateArrows(languageRowRef, setShowLeftLang, setShowRightLang);

    langEl.addEventListener("scroll", handler);
    return () => langEl.removeEventListener("scroll", handler);
  }, []);

  // scroll buttons
  const scrollNext = (ref) => ref.current?.scrollBy({ left: 250, behavior: "smooth" });
  const scrollPrev = (ref) => ref.current?.scrollBy({ left: -250, behavior: "smooth" });

  // get genres/languages
  const genres = useMemo(() => {
    const list = new Set();
    dummyShowsData.forEach((m) => m.genres.forEach((g) => list.add(g.name)));
    return [...list];
  }, []);

  const languages = useMemo(
    () => [...new Set(dummyShowsData.map((m) => m.original_language))],
    []
  );

  // filtering
  const filteredMovies = dummyShowsData.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
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
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      {/* SEARCH BAR */}
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

        <div className="sf-row-wrapper">
          {showLeftGenre && (
            <button className="sf-arrow-btn" onClick={() => scrollPrev(genreRowRef)}>
              <ChevronLeft />
            </button>
          )}

          <div className="sf-scroll-row" ref={genreRowRef}>
            {genres.map((genre) => (
              <button
                key={genre}
                className={`sf-chip ${selectedGenre === genre ? "selected" : ""}`}
                onClick={() => setSelectedGenre(selectedGenre === genre ? "" : genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {showRightGenre && (
            <button className="sf-arrow-btn" onClick={() => scrollNext(genreRowRef)}>
              <ChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* LANGUAGE SECTION */}
      <div className="sf-section">
        <p className="sf-section-title">Search By Language</p>

        <div className="sf-row-wrapper">
          {showLeftLang && (
            <button className="sf-arrow-btn" onClick={() => scrollPrev(languageRowRef)}>
              <ChevronLeft />
            </button>
          )}

          <div className="sf-scroll-row" ref={languageRowRef}>
            {languages.map((lang) => (
              <button
                key={lang}
                className={`sf-chip ${selectedLanguage === lang ? "selected" : ""}`}
                onClick={() =>
                  setSelectedLanguage(selectedLanguage === lang ? "" : lang)
                }
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {showRightLang && (
            <button className="sf-arrow-btn" onClick={() => scrollNext(languageRowRef)}>
              <ChevronRight />
            </button>
          )}
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
      </div>
    </div>
  );
};

export default SearchAndFilter;
