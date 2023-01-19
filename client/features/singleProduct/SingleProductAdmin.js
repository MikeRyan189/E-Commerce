import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../singleProduct/singleProductSlice.js";
import EditProduct from "../singleProduct/EditProduct";



const SingleProductAdmin = () => {
  const { id } = useParams();

  const singleProduct = useSelector(selectSingleProduct);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  const { name, price, description, imageUrl, quantity } = singleProduct.singleProduct;

  return (
    <div className="flex flex-col sm:flex-row">
        <img className="sm:w-1/3 h-1/4 m-2" src={imageUrl} />
        <div className="sm:w-2/3 p-4">
            <h1 className="text-3xl font-medium text-indigo-500">{name}</h1>
            <h2 className="text-xl font-medium text-indigo-400">${price}</h2>
            <p className="text-lg font-medium text-indigo-400">{description}</p>
            <p className="text-lg font-medium text-indigo-400">Quantity: {quantity}</p>
            <EditProduct />
        </div>
    </div>
);

};

export default SingleProductAdmin;
