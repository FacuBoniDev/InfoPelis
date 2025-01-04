import './verMasTarde.css';
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export function VerMasTarde() {
    const navigate = useNavigate();

    // Función segura para obtener datos de localStorage
    const getSavedMovies = () => {
        try {
            const storedMovies = localStorage.getItem('savedMovies');
            return storedMovies ? JSON.parse(storedMovies) : []; // Si no hay datos, retorna un array vacío
        } catch (error) {
            console.error('Error al parsear localStorage:', error);
            return []; // Retorna un array vacío en caso de error
        }
    };

    const [savedMovies, setSavedMovies] = useState(getSavedMovies);

    // Sincroniza `savedMovies` con localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }, [savedMovies]);

    const eliminarToast = () => {
        toast.info('Película eliminada de la lista.', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce,
        });
    };

    const handleRemove = (event, imdbID) => {
        event.stopPropagation(); // Detiene la propagación del clic al contenedor padre
        const updatedMovies = savedMovies.filter((movie) => movie.imdbID !== imdbID);
        setSavedMovies(updatedMovies);
        eliminarToast();
    };

    const vaciarTodo = () => {
        setSavedMovies([]); // Vacía el estado local
    };

    return (
        <section className='verMasTardeSection'>
            {savedMovies.length === 0 ? (
                <>
                <p className='noMoviesMessage'>No hay películas en Ver Más Tarde.</p>
                <img src='public/assets/7VE.gif' alt='memeGift' className='memeGift'></img>
                <div className='barra2'></div>
                </>
            ) : (
                <>
                    <h3 className='verMasTardeTitulo'>Todas tus películas guardadas</h3>
                    <div className="verMasTardeContainer">
                        {savedMovies.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="movieCard"
                                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                            >
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="moviePoster"
                                />
                                <button
                                    className="removeButton"
                                    onClick={(event) => handleRemove(event, movie.imdbID)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='botonVaciar' onClick={vaciarTodo}>
                        <p>Vaciar todos los elementos guardados 👋🏼</p>
                    </div>
                </>
            )}
            <div className='barra1'></div>
            <ToastContainer />
        </section>
    );
}
