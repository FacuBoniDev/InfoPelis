import './header.css';
import { FaHome, FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <div className='espaciador'>
                <Link to="/" className="home" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <FaHome /> <p>Home</p>
                </Link>
            </div>
            <img 
                className="logo" 
                src= "../dist/assets/Logo-removebg-preview.png"
                alt="Info Pelis Logo" 
            />
            <div className='espaciador'>
                <Link to="/ver-mas-tarde" style={{ textDecoration: 'none', color: 'inherit', padding:'none'}}>
                    <div className="verMasTarde">
                        <p>Ver más tarde</p> <FaRegClock />
                    </div>
                </Link>
            </div>
        </header>
    );
}
