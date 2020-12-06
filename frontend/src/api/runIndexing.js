import { API_ENDPOINT } from '../constants';

const runIndexing = (setResult, setLoading) => {
  fetch(API_ENDPOINT + '/index' + window.location.search)
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      setResult(result);
      setLoading(false);
    })
    .catch(() => {
      setResult({ message: 'Error during request' });
      setLoading(false);
    });
};

export default runIndexing;
