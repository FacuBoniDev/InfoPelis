import './cardList.css';
import { Inicio } from './Inicio';
import { Card } from './Card';

export function CardList({ data }) {
if (!data || data.length === 0) {
return <Inicio />;
}

return (
<div className="cardContainer">
    {data.map((item) => (
    <Card key={item.imdbID} movie={item} claseNueva=''/>
    ))}
</div>
);
}
