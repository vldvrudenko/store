import React from "react";
import Card from "../components/Card";
export const AppContext = React.createContext({});

function Home({
  cartItems,
  items,
  searchValue,
  setSearchValue,
  onChangeSearcheInput,
  onAddFavorites,
  onAddToCard,
  isLoading
}) {
  const {isItemAdded} = React.useContext(AppContext);
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );
    return (isLoading ? [...Array(8)] :  filtredItems).map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddFavorites(obj)}
          onPlus={(obj) => onAddToCard(obj)}
          // added={isItemAdded(item && item.id)}
          added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
          loading={isLoading}
          {...item}
        />
     
    
      ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue
            ? `You are trying to find: '${searchValue}'`
            : "All shoes"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearcheInput}
            value={searchValue}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}
export default Home;
