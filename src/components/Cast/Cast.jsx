import React, { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../services/api';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCredits = async () => {
      const movieCast = await fetchMovieCredits(movieId);
      setCast(movieCast);
    };
    getMovieCredits();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(member => (
          <li key={member.cast_id}>
            {member.name} as {member.character}
          </li>
        ))}
      </ul>
    </div>
  );
};