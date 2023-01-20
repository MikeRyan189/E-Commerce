import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"
import { selectSingleUser } from "../usersadmin/singleUserSlice";
import { fetchSingleUserAsync } from "../usersadmin/singleUserSlice";
import { deleteSingleUserAsync } from "../usersadmin/usersSlice";
import { deleteSingleCartAsync } from "../usersadmin/usersSlice";
import Cart from "../cart/Cart";


const SingleUser = () => {

    const navigate = useNavigate()

    const { id }  = useParams()


  const user = useSelector(selectSingleUser);
  console.log("USER: ", user)

  const dispatch = useDispatch()

  const handleDelete = (userId) => {
    dispatch(deleteSingleCartAsync(userId)).then(()=>dispatch(deleteSingleUserAsync(userId))).then(()=>(navigate('/admin/users', {replace: true})))
  }

  useEffect(() => {
    dispatch(fetchSingleUserAsync(id))
  },[dispatch]);

  return (
    <div className="p-4 rounded-full border-2 border-indigo-500">
            <p>{user.username}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => handleDelete(user.id)}>Delete User</button>
        
    </div>
        )}
      
export default SingleUser