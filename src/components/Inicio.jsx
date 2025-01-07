import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import './loader.css';
import './inicio.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowTrendUp, FaGithub } from 'react-icons/fa6';
import { Recom } from './Recom';
import { TbApi } from "react-icons/tb";

export function Inicio() {
const API_KEY = 'a4b0eb1d';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchMovies = async () => {
    try {
    setLoading(true);

    const imdbIDs = [
        'tt0111161',
        'tt0068646',
        'tt0468569',
        'tt0071562',
        'tt0050083',
        'tt0167260',
        'tt0108052',
        'tt0110912',
        'tt0120737',
        'tt0060196',
        'tt0109830',
        'tt0167261',
        'tt0137523',
        'tt1375666',
        'tt0080684',
        'tt0133093',
        'tt0099685',
        'tt0073486',
        'tt0816692',
        'tt0114369',
        'tt0038650',
        'tt0047478',
        'tt0102926',
        'tt0120815',
        'tt0317248',
        'tt0120689',
        'tt0118799',
        'tt0103064',
        'tt0076759',
        'tt0088763',
    ];

    const movieInfoPromises = imdbIDs.map((id) =>
        fetch(`${API_URL}&i=${id}`).then((res) => res.json())
    );

    const movieInfo = await Promise.all(movieInfoPromises);

    setMovies(movieInfo);
    } catch (error) {
    console.error('Error fetching movies:', error);
    } finally {
    setLoading(false);
    }
};

fetchMovies();
}, []);

const anioActual = new Date().getFullYear();

return (
<main>        
    {loading ? (
    <>
        <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        </div>
    </>
    ) : (
    <>  
        <h1>
        Top 30 películas según{' '}
        <img
            className="imdb"
            src="../dist/assets/IMDB_Logo_2016.svg.png"
            alt="IMDB"
        />
        score{' '}
        <FaArrowTrendUp
            color="red"
            style={{ margin: '.5rem' }}
        />
        </h1>
        <div className="container">
        <div className="swiperContainer">
            <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
            pagination={{
                el: '.pagination',
                clickable: true,
            }}
            breakpoints={{
                300: {
                slidesPerView: 2,
                spaceBetween: 5,
                },
                600: {
                slidesPerView: 4,
                spaceBetween: 5,
                },
                800: {
                slidesPerView: 2.6,
                spaceBetween: 5,
                },
                1200:{
                slidesPerView: 3.2,
                spaceBetween: 5,
                },
                1500: {
                slidesPerView: 5.2,
                spaceBetween: 20,
                },
            }}
            >
            {movies?.map((movie) => (
                <SwiperSlide key={movie.imdbID}>
                <Card claseNueva="card2" movie={movie} />
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        <div className="pagination" />
        </div>
        <Recom />
        <footer>
            <a href='https://www.omdbapi.com' target="_blank"><TbApi className='footerIcon' color='rgb(41, 144, 228)' /></a>
            <p>{anioActual} FacuBoniDev. All rights reserved. - InfoPelis</p>
            <a href='https://github.com/FacuBoniDev/InfoPelis' target='blank'><FaGithub className='footerIcon' color='#f1f1f1'/></a>
        </footer>
    </>
    )}
</main>
);
}
