import { useState, useEffect, useRef } from 'react';

const KEY = 'd8bed612';

export function useMoviesById(initialMovieIds) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const movieIdsRef = useRef(initialMovieIds);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchMoviesById() {
      try {
        setIsLoading(true);
        setError('');
        const moviesData = [];

        for (const id of movieIdsRef.current) {
          console.log(id);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movie by ID');

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');

          console.log(data);

          moviesData.push(data);
        }

        setMovies(moviesData);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (movieIdsRef.current.length === 0) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMoviesById();

    return function () {
      controller.abort();
    };
  }, []);

  return { movies, isLoading, error };
}
