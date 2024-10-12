import { useState, useEffect, useRef } from 'react';

const KEY = 'd8bed612';

export function useMoviesById(initialMovieIds) {
  const [movies, setMovies] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);
  const [error, setError] = useState('');
  const cache = useRef({});

  useEffect(() => {
    const fetchMovies = async () => {
      setLoadingStates(initialMovieIds.map(() => true));

      const moviesData = await Promise.all(
        initialMovieIds.map(async (id, index) => {
          try {
            if (cache.current[id]) {
              return cache.current[id];
            } else {
              const res = await fetch(
                `https://www.omdbapi.com/?apikey=${KEY}&i=${id}`
              );

              if (!res.ok) throw new Error('Something went wrong');

              const data = await res.json();
              if (data.Response === 'False') throw new Error('Movie not found');

              cache.current[id] = data;
              return data;
            }
          } catch (error) {
            console.error(`Error fetching movie ${id}:`, error);
            setError(error.message);
            return null;
          } finally {
            setLoadingStates((prev) => {
              const newLoadingStates = [...prev];
              newLoadingStates[index] = false;
              return newLoadingStates;
            });
          }
        })
      );

      setMovies(moviesData.filter((movie) => movie !== null));
    };

    fetchMovies();
  }, []);

  const isLoading = loadingStates.some((state) => state);

  return { movies, isLoading, error };
}
