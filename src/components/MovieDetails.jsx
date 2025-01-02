import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './movieDetails.css'
import './loader.css'
import { FaArrowAltCircleLeft } from "react-icons/fa";

export function MovieDetails() {
const { id } = useParams(); 
const [movie, setMovie] = useState(null);
const navigate = useNavigate(); 
const API_KEY = 'a4b0eb1d';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;

useEffect(() => {
const fetchMovieDetails = async () => {
    try {
    const response = await fetch(API_URL);
    const result = await response.json();
    setMovie(result);
    } catch (error) {
    console.log('Error fetching movie details:', error);
    }
};

fetchMovieDetails();
}, [id]);

if (!movie) {
return  <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>;
}

return (
<>
<div className='barra3'></div>
<div className='barra4'></div>
<div className='movieDetailsContainer'>
        <section>
            <img className='poster' src={movie.Poster} alt={movie.Title} />
            <div className='infoContainer'>
                <div>    
                    <div className='titleYear'>
                        <h1 className='titulo'>{movie.Title}</h1>                      
                        <p className='year'>({movie.Year})</p>
                        <p className='pegi'>{movie.Rated}</p>
                    </div>
                    <p className='trama'>{movie.Plot}</p>
                </div>  
                <div className='data'>  
                    <p><strong>Fecha de estreno:</strong> {movie.Released}</p>
                    <p><strong>Duración:</strong> {movie.Runtime}</p>
                    <p><strong>Género:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actores:</strong> {movie.Actors}</p>
                    <p><strong>Idioma:</strong> {movie.Language}</p>
                    <p><strong>Premios:</strong> {movie.Awards}</p>
                    <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                </div>
            </div>
        </section>
</div>    
{}
    <button className='volver' onClick={() => navigate(-1)}>
        <FaArrowAltCircleLeft className='flecha' />
        <p>Volver</p>
    </button>
</>
);
}
