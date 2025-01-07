import './recom.css';
import React, { useState, useEffect } from 'react';
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Link } from 'react-router-dom';

export function Recom() {
    const API_KEY = 'a4b0eb1d';
    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

    const [recoms, setRecoms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecoms = async () => {
            try {
                const IDs = [
                    'tt0361748',
                    'tt0209144',
                    'tt0468569',
                    'tt0172495',
                    'tt6751668',
                    'tt2582802',
                    'tt0266697',
                    'tt9362722'
                ];
                const recomsInfoPromises = IDs.map((id) =>
                    fetch(`${API_URL}&i=${id}`).then((res) => res.json())
                );
                const recomsInfo = await Promise.all(recomsInfoPromises);
                setRecoms(recomsInfo);
            } catch (error) {
                console.log('Error fetching recoms', error);
            }
        };
        fetchRecoms();
    }, []);

        const agregarRecomToast = () => {
            toast('🍿 Películas añadidas a ver más tarde', {
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

    const handleAgregarRecom = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];

        const updatedMovies = [...savedMovies];
        recoms.forEach((recom) => {
            const movieExists = updatedMovies.some((movie) => movie.imdbID === recom.imdbID);
            if (!movieExists) {
                updatedMovies.push(recom);        

            }
        });

        localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));                
        agregarRecomToast()
    };

    return (
        <section className='recomendados'>
            <div className="recomContainer">
                {recoms?.map((recom) => (
                    <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/movie/${recom.imdbID}`)}
                        key={recom.imdbID}
                        src={recom.Poster}
                        alt={recom.Title}
                        className="recomPoster"
                    />
                ))}
            </div>
            <div className='recomTextoContainer'>
                <h2 className='recomTitulo'>Recomendados por <span className='infoPelis'>Info Pelis</span></h2>
                <img src='../dist/assets/Tsb.gif' alt='memeGift' className='kiddo'></img>
                <p className='recomTexto'>Me atrapaste! Es cine 🚬</p>
                <div className='masTarde' onClick={handleAgregarRecom}>
                    <FaRegClock className='reloj' /> <p>Añadir todo a Ver Más Tarde</p>
                </div>
            </div>
            <Link to="/ver-mas-tarde" style={{ textDecoration: 'none', color: 'inherit', padding:'none'}}>
                <ToastContainer />
            </Link>
        </section>
    );
}
