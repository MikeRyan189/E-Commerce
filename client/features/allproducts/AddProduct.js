import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync, fetchProductsAsync } from "./productsSlice";

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(price)){ alert("please input number in price field")}
    if (name === "" ){alert("please provide product name")}
    dispatch(addProductAsync({ name, price, description, imageUrl, quantity })).then(()=>{dispatch(fetchProductsAsync())});
  };

return (
  <form className="w-full max-w-sm mx-auto my-10 p-5 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
    <label className="block font-medium text-gray-700 mb-2">Image Url:</label>
    <input className="w-full p-2 rounded-lg bg-gray-200"
      name="imageUrl"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mb-2">Name:</label>
    <input className="w-full p-2 rounded-lg bg-gray-200"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mb-2">Price:</label>
    <input className="w-full p-2 rounded-lg bg-gray-200"
      name="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mb-2">Description:</label>
    <input className="w-full p-2 rounded-lg bg-gray-200"
      name="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mb-2">Quantity:</label>
    <input className="w-full p-2 rounded-lg bg-gray-200"
      name="Quantity"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
    />
    <button className="w-full py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600" type="submit">Add Product</button>
  </form>
);
};
export default AddProduct

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addProductAsync, fetchProductsAsync } from "./productsSlice";

// const AddProduct = () => {
//   const [imageUrl, setImageUrl] = useState("")
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState("");
  
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isNaN(price)){ alert("please input number in price field")}
//     if (name === "" ){alert("please provide product name")}
//     dispatch(addProductAsync({ name, price, description, imageUrl, quantity })).then(()=>{dispatch(fetchProductsAsync())});
//   };
  
  
//   return (
//     <form id="productForm" onSubmit={handleSubmit}>
//       <label htmlFor="imageUrl">Image Url:</label>
//       <input
//         name="imageUrl"
//         value={imageUrl}
//         onChange={(e) => setImageUrl(e.target.value)}
//       />
//       <label htmlFor="name">Name:</label>
//       <input
//         name="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label htmlFor="price">Price:</label>
//       <input
//         name="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <label htmlFor="description">Description:</label>
//       <input
//         name="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <label htmlFor="quantity">Quantity:</label>
//       <input
//         name="Quantity"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//       />
//       <button type="submit">Add Product</button>
      
//     </form>
//   );
// };


// export default AddProduct;