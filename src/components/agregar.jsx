import { FaBookmark } from "react-icons/fa";
import './agregar.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export function Agregar({ movie }) {

    const agregarToast = () => {
        toast('🍿 Película agregada a Ver Más Tarde', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    const errorToast = () => {
        toast.error('❌ La película ya fue agregada', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    const handleSave = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        const movieExists = savedMovies.some((savedMovie) => savedMovie.imdbID === movie.imdbID);

        if (!movieExists) {
            savedMovies.push(movie);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            agregarToast()
        } else {
            errorToast()
        }
    };

    return (
        <>
        <div className="botonAgregar" onClick={ () => {handleSave(); }}>
            <FaBookmark color="rgb(41, 144, 228)" /><p>Ver más tarde</p>
        </div>
        <ToastContainer />
        </>
    );
}
