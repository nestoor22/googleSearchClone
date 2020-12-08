import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { Typography } from '@material-ui/core';

import { AppHeader, SearchInputField, SubmitButton } from 'components';
import searchPages from 'api/searchPages';

import useStyles from './styles';

const SearchPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [moreIsAvailable, setMoreIsAvailable] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [foundedResults, setFoundedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchItemChanges = (event) => {
    setSearchItem(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    history.push({
      pathname: '/search',
      search: `?q=${searchItem}`,
    });
    searchPages(setFoundedResults, setLoading, offset, limit);
  };

  const addFetchedData = (newData) => {
    setFoundedResults([...foundedResults, ...newData]);
    if (newData.length >= 10) {
      setMoreIsAvailable(true);
    } else {
      setMoreIsAvailable(false);
    }
  };

  const handleRedirect = (url) => {
    window.location = url
  };

  const handleLoadMore = () => {
    const newOffset = offset + 10;
    const newLimit = limit + 10;
    history.push({
      pathname: '/search',
      search: `?q=${searchItem}`,
    });
    searchPages(addFetchedData, setLoading, newOffset, newLimit);
    setOffset(newOffset);
    setLimit(newLimit);
  };

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setSearchItem(params.get('q') || '');
  }, []);

  useEffect(() => {
    setLimit(10);
    setOffset(0);
  }, [searchItem]);

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.searchBlock}>
        <SearchInputField
          placeholder={'Search...'}
          value={searchItem}
          handleChange={handleSearchItemChanges}
        />
        <SubmitButton
          disabled={!searchItem}
          handleSubmit={handleSubmit}
          label={'Search'}
        />
      </div>
      <div className={classes.content}>
        {loading && (
          <Loader type="Rings" color="#00BFFF" height={120} width={120} />
        )}
        {foundedResults.length !== 0 &&
          foundedResults?.map((el, index) => {
            return (
              <div key={index} className={classes.foundedItem}>
                <Typography onClick={() => {
                  handleRedirect(el.web_page_url)
                  }}
                  className={classes.title}
                >
                  {el.title}
                </Typography>
                <a href={el.web_page_url}>{el.web_page_url}</a>
              </div>
            );
          })}
        {foundedResults.length >= 10 && moreIsAvailable && (
          <SubmitButton
            label={'Load more'}
            handleSubmit={() => handleLoadMore()}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
