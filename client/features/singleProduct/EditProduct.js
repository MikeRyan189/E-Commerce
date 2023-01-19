import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, editSingleProduct } from "./singleProductSlice";

const EditProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");



  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(id)).then((res) => {
      const { imageUrl, name, price, description, quantity } = res.payload;

      setImageUrl(imageUrl);
      setName(name);
      setPrice(price);
      setDescription(description);
      setQuantity(quantity);
    });
  }, [dispatch]);

  const handleEditProduct = (e) => {
    e.preventDefault();
    dispatch(
      editSingleProduct({ id, name, price, description, imageUrl, quantity })
    ).then(() => {
      dispatch(fetchSingleProduct(id));
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-medium text-indigo-500">Edit Product</h1>
      <form 
        onSubmit={handleEditProduct}
        className="bg-white p-5 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label 
            htmlFor="imageUrl"
            className="block text-gray-700 font-medium mb-2"
          >
            Image Url:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
            Price:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="quantity"
            className="block text-gray-700 font-medium mb-2"
          >
            Quantity:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button 
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600" 
          type="submit"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
