import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectProducts } from "../allproducts/productsSlice";
import { fetchProductsAsync } from "../allproducts/productsSlice";
import { deleteSingleProductAsync } from "../allproducts/productsSlice";
import AddProduct from "../allproducts/AddProduct";

const AllProductsAdmin = () => {
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(deleteSingleProductAsync(productId)).then(() =>
      dispatch(fetchProductsAsync())
    );
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <AddProduct />
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <Link to={`/admin/products/${product.id}`}>
                  <img src={product.imageUrl} />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                </Link>
              </div>
              <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 py-4">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full"
                onClick={() => handleDelete(product.id)}
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllProductsAdmin;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { selectProducts } from "../allproducts/productsSlice";
// import { fetchProductsAsync } from "../allproducts/productsSlice";
// import { deleteSingleProductAsync } from "../allproducts/productsSlice";
// import AddProduct from "../allproducts/AddProduct";

// const AllProductsAdmin = () => {
//   const products = useSelector(selectProducts);

//   const dispatch = useDispatch();

//   const handleDelete = (productId) => {
//     dispatch(deleteSingleProductAsync(productId)).then(() =>
//       dispatch(fetchProductsAsync())
//     );
//   };

//   useEffect(() => {
//     dispatch(fetchProductsAsync());
//   }, [dispatch]);

//   return (
//     <div id="allProducts">
//       <AddProduct />
//       <ul>
//         {products.map((product) => (
//           <li>
//             <Link to={`/admin/products/${product.id}`}>
//               <img src={product.imageUrl} />
//               <p>{product.name}</p>
//               <p>${product.price}</p>
//             </Link>
//             <button onClick={() => handleDelete(product.id)}>
//               Delete Product
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllProductsAdmin;