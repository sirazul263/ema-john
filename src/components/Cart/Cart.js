import React from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const items = props.cart;
  //const totalPrice = props.cart.reduce((total, prod) => total + prod.price, 0);
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].quantity;
  }
  let shipping = 0;
  if (total < 35 && total !== 0) {
    shipping = total > 15 ? 4.99 : 12.99;
  }
  const tax = (total / 10).toFixed(2);
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);
  return (
    <div>
      <h4>Order Summary</h4>
      <p>Ordered Items: {items.length} </p>
      <p>Product Price: ${total.toFixed(2)}</p>
      <p>
        <small>Shipping Price: ${shipping}</small>
      </p>
      <p>Tax + Vat: ${tax}</p>
      <p>Total: ${grandTotal}</p>
      {props.children}
    </div>
  );
};

export default Cart;
