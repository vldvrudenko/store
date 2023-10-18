import React from "react";
import { AppContext } from "../App";

const Info = ({image , title , description}) => {
    const {setCartOpened}=React.useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"

        src={image}
        alt="box"
      ></img>
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={()=>setCartOpened(false)}>
        <img src="/img/line.svg" alt="arrow"></img>
        Go back
      </button>
    </div>
  );
};
export default Info