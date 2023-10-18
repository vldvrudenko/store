import React from 'react';
import Card from '../components/Card'
import { AppContext } from '../App';

function Favorites({  onAddFavorites }) {
    const {favorites} = React.useContext(AppContext);
    return (

        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>my boxes</h1>

            </div>

            <div className="d-flex flex-wrap">
                {favorites
                    .map((item, index) => (
                        <Card
                            key={index}
                            id={item.id}
                            favorited={true}
                            onFavorite={onAddFavorites}
                            {...item}
                        />
                    ))}
            </div>

        </div>)
}
export default Favorites;