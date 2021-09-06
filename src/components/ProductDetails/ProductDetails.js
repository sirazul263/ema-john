import React from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import "./ProductDetails.css";
import fakeData from "../../fakeData";

const ProductDetails = () => {
  const { productKey } = useParams();
  const product = fakeData.find((pd) => pd.key === productKey);
  console.log(product);
  return (
    <div>
      <h1> Product Details</h1>
      <Product product={product} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetails;
