import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin === true);
  console.log("IS ADMIN IN NAVBAR: ", isAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* <h1 className="text-white bg-gray-900 flex justify-center text-4xl p-7 brightness-50 italic">
        Grace Shopper
      </h1> */}
      <nav>
        {isLoggedIn && !isAdmin ? (
          <div className="flex justify-evenly text-white bg-gray-900 text-1xl p-2 brightness-80 italic">
            {/* The navbar will show these links after you log in */}
            <Link
              to="/home"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Cart
            </Link>
            <button
              type="button"
              onClick={logoutAndRedirectHome}
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Logout
            </button>
          </div>
        ) : isAdmin ? (
          // {/* This navbar will show after you log in as an ADMIN */}
          <div className="flex justify-evenly text-white bg-gray-900 text-1xl p-2 brightness-80 italic">
            <Link
              to="/admin/products"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Admin Products
            </Link>
            <Link
              to="admin/signupAdmin"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Sign Up New Admin
            </Link>

            <Link
              to="admin/users"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Users
            </Link>
            {/* <Route
      ro="/products"
      element={<AllProducts />} /> */}
            <button
              type="button"
              onClick={logoutAndRedirectHome}
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-evenly text-white bg-gray-900 text-1xl p-2 brightness-80 italic">
            {/* The navbar will show these links before you log in */}
            <Link
              to="/home"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Sign Up
            </Link>
            {/* <Link to="/signupAdmin">Sign Up as Admin</Link> */}
            <Link
              to="/products"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Products
            </Link>
            <Link
              to="/guestCart"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Cart
            </Link>
            <Link
              to="/loginAdmin"
              className="text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md"
            >
              Admin Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
