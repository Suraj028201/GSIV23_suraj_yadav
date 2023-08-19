import Header from './Header';
import { useSelector } from 'react-redux';
import '../style/details-page.css';

const DetailsPage = () => {

  const { movie } = useSelector((state:any) => state.getMovie.movie);

  return (
    <div>
      <Header />
      <div className="details-container">
        <div className="poster-container">
          <img
            className="details-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details">
          <h2 className="details-title">{movie.title}</h2>
          <p className="details-rating">Rating: {movie.vote_average}</p>
          <p>Release date: {movie.release_date}</p>
          <p className="details-description">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage