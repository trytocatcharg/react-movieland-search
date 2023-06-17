import {useEffect, useState} from 'react';
import './App.css';
import searchSvg from './search.svg';
import MovieCard from './MovieCard';
import { MovieCardModel } from './models/movies';


const API_URL = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_APP_API_KEY}`;

const App = () => {
const [movies ,setMovies] = useState([] as MovieCardModel[]);
const [searchTerm, setSearchTerm] = useState('Batman');

  const searchMovies = async (title: string) => {
    const response = await searchMovieFromApi(title);

    setMovies(response.Search);

  }

  const searchMovieFromApi = (title: string) => {
    return fetch(`${API_URL}&s=${title}`).then(r => r.json());
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm)
    }
  }

  useEffect(() => {
    searchMovies(searchTerm);

  }, [])
  
  
  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for movies'
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <img src={searchSvg} alt='search icon' onClick={() => { searchMovies(searchTerm)}}></img>
      </div>


      {
        movies?.length > 0 ? (
          <div className='container'>
           {
            movies.map( (movie) => (<MovieCard {...movie} key={movie.Title}></MovieCard>) )
           }
         </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }

     

    </div>
  )
}

export default App