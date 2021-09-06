import React, { useEffect, useState } from "react";
import thankyou from "../../images/giphy.gif";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";
import "./Review.css";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  const history = useHistory();
  const handleProceedOrder = () => {
    history.push("/shipment");
  };
  let thanks;
  if (orderPlaced) {
    thanks = <img src={thankyou} alt="" />;
  }

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        <h1>Products: {cart.length}</h1>
        {cart.map((pd) => (
          <ReviewItems product={pd} removeProduct={removeProduct}></ReviewItems>
        ))}
        {thanks}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          {" "}
          <button className="main-button" onClick={handleProceedOrder}>
            {" "}
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
