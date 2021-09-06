import React from "react";
import "./ReviewItems.css";

const ReviewItems = (props) => {
  //console.log(props);
  const { name, img, quantity, price, seller, key } = props.product;
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h4 className="product-name">{name}</h4>
        <h5>${price}</h5>
        <p>
          <small>By: {seller}</small>
        </p>
        <p>
          <small>Quantity: {quantity}</small>
        </p>
        {/* <br /> */}
        <button
          className="main-button"
          onClick={() => props.removeProduct(key)}
        >
          {" "}
          Remove product
        </button>
      </div>
    </div>
  );
};

export default ReviewItems;
