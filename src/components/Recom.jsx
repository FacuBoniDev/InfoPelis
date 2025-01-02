import './recom.css';
import React, { useState, useEffect } from 'react';

export function Recom() {
const API_KEY = 'a4b0eb1d';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const [recoms, setRecoms] = useState([]);

useEffect(() => {
const fetchRecoms = async () => {
    try {
    const IDs = [
        'tt0111161',
        'tt0068646',
        'tt0468569',
        'tt1375666',
        'tt0080684',
        'tt0133093',
        'tt0099685',
        'tt0071562',
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

return (
    <section className='recomendados'>
        <div className="recomContainer">
            {recoms?.map((recom) => (
            <img
                key={recom.imdbID}
                src={recom.Poster}
                alt={recom.Title}
                className="recomPoster"
            />
            ))}
            
        </div>
        <p>En proceso profe</p>
    </section>
);
}
