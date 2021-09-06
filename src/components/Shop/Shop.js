import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first = fakeData.slice(0, 15);
  const [product, setProduct] = useState(first);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousProduct = productKeys.map((key) => {
      const cartProducts = fakeData.find((pd) => pd.key === key);
      cartProducts.quantity = savedCart[key];
      return cartProducts;
    });
    setCart(previousProduct);
  }, []);
  const addProductHandler = (product) => {
    // console.log("Product added", product);
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity += 1;
      const others = cart.filter((pd) => pd.key !== product.key);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    //const count = sameProduct.length;
    setCart(newCart);

    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {product.map((pro) => (
          <Product
            key={pro.key}
            showAddToCart={true}
            product={pro}
            addProductHandler={addProductHandler}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            {" "}
            <button className="main-button"> Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
