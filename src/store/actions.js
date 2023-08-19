export const getMovieDetails = (movie) => ({
    type: 'GET_MOVIE_DETAILS',
    payload: movie,
})

export const displayedPage = (page) => ({
    type: 'USER_PAGE',
    payload: page,
})