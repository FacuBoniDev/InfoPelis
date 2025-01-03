import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate, matchPath } from 'react-router-dom';
import { Searcher } from './components/Search';
import { CardList } from './components/CardList';
import { MovieDetails } from './components/MovieDetails';
import { Header } from './components/Header';
import { Inicio } from './components/Inicio';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const API_KEY = 'a4b0eb1d';
  const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`;
  const location = useLocation();
  const navigate = useNavigate();

  const changeSearch = (value) => {
    setSearch(value);
    setIsSearching(true);
    navigate('/search');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.Search) {
          const filteredData = result.Search.filter(
            (item) => item.Type === 'movie' || item.Type === 'series'
          );
          setData(filteredData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log('Error Message: ' + error);
      } finally {
        setIsSearching(false);
      }
    };

    if (search && location.pathname === '/search') {
      fetchData();
    }
  }, [search, location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') {
      setSearch('');
      setData(null);
      setIsSearching(false);
    }
  }, [location.pathname]);

  const isMovieDetails = matchPath('/movie/:id', location.pathname);

  return (
    <>
      <Header />
      {!isMovieDetails && (
        <>
        <Searcher search={search} changeSearch={changeSearch} />        
        <div className='barra1'></div>
        <div className='barra2'></div>
        </>
      )}


      <Routes>
        {!isSearching && <Route path="/" element={<Inicio />} />}
        <Route path="/search" element={<CardList data={data} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
