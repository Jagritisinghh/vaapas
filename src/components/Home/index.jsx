import { useState } from "react";
import Searchbar from "../Searchbar";
import "./index.css"
import MovieList from "../MovieList";

const Home=()=>{
    const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
 const fetchMovies = async (query) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();
   
    
    // console.log(data.docs)

    return data.docs;
  };
  
   const processMovieData = (data) => {
    return  data.map(item => ({
      title: item.title,
      author: item.author_name ? item.author_name.join(', ') : 'Unknown Author',
      PublishedDate: item.first_publish_year || 'N/A'
    }));
    
  };
  

  const handleSearch = async (query) => {
    setLoading(true);
    setNoResults(false);
    setError(null);
    try {
      const data = await fetchMovies(query);
      
      const processedData = processMovieData(data);
      console.log(processedData)
      if (processedData.length === 0) {
        setNoResults(true);
      } else {
        setMovies(processedData);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
    setLoading(false);
  };
    
    
    return(
    <div className="main-container">
        <div className="banner-container">
            <img src="banner.jpg" alt="banner" className="banner"/>
        </div>
        <h1 className="heading">Movie Search Application</h1>
        <Searchbar onSearch={handleSearch}/>
        <div className="movie-card-container">
        {loading && <p className="loader">Loading...</p>}
      {noResults && !loading && <p className="not-found">No movies found. Please try a different search.</p>}
      {!loading && !error && !noResults && <MovieList movies={movies} />} 
        </div>
    </div>
)
}

export default Home