import { useNavigate } from 'react-router-dom';
import './card.css'

export function Card({ movie, claseNueva }) {
const navigate = useNavigate();

return (
<div
    className={`card ${claseNueva}`}
    onClick={() => navigate(`/movie/${movie.imdbID}`)}
    style={{ cursor: 'pointer' }}
>   
    <div className='cardInfo'>
        <h3>{movie.Title}</h3>        
        <span className='cardYear'>({movie.Year})</span>
    </div>
        <img className='cardImg' src={movie.Poster} alt={'Image not found'} />
</div>
);
}
