import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h4 className="product-name">
          <Link to={"/" + key}>{name}</Link>
        </h4>
        <p>
          <small>by: {seller}</small>
        </p>
        {/* <br /> */}
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock-order soon</small>
        </p>
        {props.showAddToCart === true && (
          <button
            className="main-button"
            onClick={() => props.addProductHandler(props.product)}
          >
            {" "}
            <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
