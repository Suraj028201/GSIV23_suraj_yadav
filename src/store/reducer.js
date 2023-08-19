import { combineReducers } from "redux";

const initialState = {
   movie: [],
}

const fetchMovieDetails = (state = initialState, action) => {
    switch(action.type){
        case 'GET_MOVIE_DETAILS':
            return {
                movie: action.payload,
            }
        default:
            return { movie:state };
    }
}   

const userPage = (state = initialState, action) => {
    switch(action.type){
        case 'USER_PAGE':
            return {
                page: action.payload,
            }
        default:
            return { page: 'home_page' };
    }
}

const rootReducer = combineReducers({
    getMovie: fetchMovieDetails,
    userPage: userPage,
})

export default rootReducer;