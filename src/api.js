import axios from 'axios';

export const naverMoviesApi = {
  search: (like, limit) => axios.get('https://yts.mx/api/v2/list_movies.json', {
    params: {
    sort_by: like + "_count",
    limit: limit
    }
  }),

  search_like: id => axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=', {
    params: {
      movie_id: id
    }
  }),
};
