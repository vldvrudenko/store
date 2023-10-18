import React from "react";
import Info from "./Info";
import { AppContext } from "../App";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://645cf7fee01ac6105898c6fd.mockapi.io/Orders`,
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://645cf7fee01ac6105898c6fd.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Problem with your order, try again");
    }
    setIsLoading(false);
  };
  return (
    <div className="overlay ">
      <div className="drawer ">
        <h3 className="mb-30 d-flex justify-between ">
          Store
          <img onClick={onClose} className="cu-p" src="/img/close.svg" />
        </h3>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div key={obj} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-removed.svg"
                    alt="Removed"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>All:</span>
                  <div></div>
                  <b>{totalPrice} uah</b>
                </li>
             
              </ul>
              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onClickOrder}
              >
                Order <img src="/img/line.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={
              isOrderComplete ? `Thank you for buying here` : `Empty Basket`
            }
            image={isOrderComplete ? `/img/basketImg.svg` : `/img/basket.svg`}
            description={
              isOrderComplete
                ? `Number of your buying #${orderId}`
                : `Add sneakers`
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
