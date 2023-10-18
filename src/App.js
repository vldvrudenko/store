import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [favorites, setIsFavorite] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "https://645cf7fee01ac6105898c6fd.mockapi.io/items"
      );

      const CartResponse = await axios.get(
        "https://645cf7fee01ac6105898c6fd.mockapi.io/cart"
      );

      const cartFavorite = await axios.get(
        "https://65182dcd582f58d62d357a76.mockapi.io/favorites"
      );

      setIsLoading(false);

      setCartItems(CartResponse.data);
      setItems(itemsResponse.data);
      setIsFavorite(cartFavorite.data);
    }
    fetchData();
  }, []);

  const onAddToCard = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://645cf7fee01ac6105898c6fd.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios
        .post("https://645cf7fee01ac6105898c6fd.mockapi.io/cart", obj)
        .then((res) => setCartItems((prev) => [...prev, res.data]));
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://645cf7fee01ac6105898c6fd.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://65182dcd582f58d62d357a76.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://65182dcd582f58d62d357a76.mockapi.io/favorites",
          obj
        );

        setIsFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("problem");
    }
  };

  const onChangeSearcheInput = (event) => {
    setSearchValue(event.target.value);
  };
const isItemAdded  = (id) =>{
  return cartItems.some((obj) => Number(obj.id) === Number(id))
}

  // console.log(cartItems);
  return (
    <AppContext.Provider value={{cartItems, favorites , items ,isItemAdded,setCartItems , setCartOpened}}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearcheInput={onChangeSearcheInput}
            onAddFavorites={onAddFavorites}
            onAddToCard={onAddToCard}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites items={favorites} onAddFavorites={onAddFavorites} />
        </Route>
      </div>
    </AppContext.Provider>
  );
}
// 2/05
export default App;

