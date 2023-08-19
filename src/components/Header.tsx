import {useState} from 'react';
import '../style/header.css';
import { IconHome } from '../assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { displayedPage } from '../store/actions';
import { environment } from '../environment/environment';

const Header = () => {

    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector((state:any) => state.userPage.page);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.AUTH_KEY
      }
    };

    const handleHomeClick = () => {
      dispatch(displayedPage('home_page'));
      navigate('/');
    };

    window.addEventListener('popstate', () => {
      dispatch(displayedPage('home_page'));
    });

    const handleSearch = (e:any) => {
      axios.get(`${environment.BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${e.target.value}`, options).then((response) => {
        setSearchResults(response.data.results);
      }).catch((error) => {
        console.log('Error in searching: ', error);
      })
    }


    return (
      <>
      <div className="header">
        <div className="search-area">
          {page === 'home_page' ? <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e)}
            className="search-input"
          /> : <span>Movie Details</span>}
          <div className="search-results">
            {searchResults.map((movie:any) => (
              <div key={movie.id} className="movie-result">
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="home-button" onClick={handleHomeClick}>
          <IconHome />
        </div>
      </div>
      <hr className="header-underline" />
      </>
    )
}   

export default Header;