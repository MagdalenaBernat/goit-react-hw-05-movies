import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../services/api';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <ul>
        <li>
          <Link to={`${url}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`${url}/reviews`}>Reviews</Link>
        </li>
      </ul>

      <Route path={`${path}/cast`} component={lazy(() => import('./Cast'))} />
      <Route path={`${path}/reviews`} component={lazy(() => import('./Reviews'))} />
    </div>
  );
};
