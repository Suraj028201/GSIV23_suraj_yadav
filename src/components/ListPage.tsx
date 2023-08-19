import { useEffect, useState } from 'react'
import Header from './Header';
import axios from 'axios';
import '../style/list-page.css';
import { useDispatch } from 'react-redux';
import { displayedPage, getMovieDetails } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../utils/Movie';
import { environment } from '../environment/environment';

const ListPage = () => {

    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: environment.AUTH_KEY
        }
    };

    const fetchUpcomingMovieList = () => {
      axios.get(`${environment.BASE_URL}/movie/upcoming?language=en-US&page=${currentPage}`, options).then((response) => {
        const sortedMovies = response.data.results.sort((a:Movie, b:Movie) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        );
        setMovieList(sortedMovies);
        console.log(sortedMovies);
      }).catch((error) => {
        console.log('error in fetchign movie: ', error);
      })
    }

    useEffect(() => {
      localStorage.setItem('pageNumber', '1');
      fetchUpcomingMovieList();
    }, [])  

    const ViewDetails = (movie:Movie) => {
      dispatch(getMovieDetails(movie));
      dispatch(displayedPage('details'));
      navigate('/details');
    }

    const loadNext = () => {
      setCurrentPage(prevPage => prevPage + 1);
      fetchUpcomingMovieList();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const loadPrevious = () => {
      if(currentPage > 0){
        setCurrentPage(prevPage => prevPage - 1);
        fetchUpcomingMovieList();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    return (
      <div>
          <Header />
          <div className="movie-list">
            {movieList.map((movie:Movie) => (
               <div key={movie.title} className="movie-card" onClick={() => {ViewDetails(movie)}}>
               <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
               <div className="title-rating">
                 <h5 className="title">{movie.title}</h5>
                 <p className="rating">Rating: {movie.vote_average}</p>
               </div>
               <p className="description">{movie.overview}</p>
             </div>
            ))}
          </div>
          <div className="paginator-buttons">
            <button className="load-more-button" onClick={loadPrevious}>
              Previous
            </button>
            <button className="load-more-button" onClick={loadNext}>
              Next
            </button>
          </div>
      </div>
    )
}

export default ListPage