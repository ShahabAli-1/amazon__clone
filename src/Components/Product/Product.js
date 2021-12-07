import React from "react";
import "./Product.css";
import { useStateValue } from "../api/StateProvider.js";

const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();
  //const [state,dispatch] = useStateValue();
  const addToCart = () => {
    //add item to basket
    dispatch({
      type: "ADD_TO_BASKET",
      payload: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <h1></h1>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p> ★ </p>
            ))}
        </div>
      </div>
      <img src={image} alt="" className="" />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
