import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './search.css';
import { FaSearch } from "react-icons/fa";

export function Searcher({ search, changeSearch }) {
const [prevSearch, setPrevSearch] = useState('');
const navigate = useNavigate();

const handleInputChange = (value) => {
setPrevSearch(value);
};

const handleSearch = () => {
changeSearch(prevSearch);
navigate('/search');
};

const handleKeyDown = (e) => {
if (e.key === 'Enter') {
    handleSearch();
}
};

return (
<div className="containerSearch">
    <input
    type="text"
    placeholder="Buscar película"
    className="input"
    value={prevSearch}
    onChange={(e) => handleInputChange(e.target.value)}
    onKeyDown={handleKeyDown}
    />
    <button className="button" onClick={handleSearch}>
    <FaSearch />
    </button>
</div>
);
}
