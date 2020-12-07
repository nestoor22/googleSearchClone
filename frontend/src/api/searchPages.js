import { API_ENDPOINT } from '../constants';

const searchResults = (setSearchResult, setLoading, offset, limit) => {
  fetch(
    API_ENDPOINT +
      '/search' +
      window.location.search +
      `&offset=${offset}&limit=${limit}`
  )
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      setSearchResult(result);
      setLoading(false);
    })
    .catch(() => {
      setLoading({ message: 'Error during request' });
      setSearchResult([]);
      setLoading(false);
    });
};

export default searchResults;
