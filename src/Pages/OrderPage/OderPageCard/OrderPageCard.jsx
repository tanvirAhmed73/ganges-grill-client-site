import Swal from "sweetalert2";
import useAuth from "../../../CustomHooks/useAuth";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useCart from "../../../CustomHooks/useCart";

const OrderPageCard = ({item}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {_id, name, image, price, recipe} = item;
    const navigate = useNavigate()
    const location = useLocation()
    const [,refetch] = useCart()
    const handleAddToCart = ()=>{
        if(user && user.email){
            const cartItem ={
                foodId : _id,
                email : user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/cart', cartItem)
            .then(res =>{
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} Added To Your Cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();
                }
            })
        }else{
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Do You Want To Log In?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log In!"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state:{from : location}})
                }
              });
        }
    }
    return (
        <div>
        <div className="card h-[450px] mt-5 bg-base-100 shadow-xl">
            <figure>
            <img className="w-full h-max"
                src={image}
                alt="food"
            />
            </figure>
            <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>Price: ${price}</p>
            <p>{recipe}</p>
            <div className="card-actions justify-end mt-3">
                <button onClick={handleAddToCart} className="btn text-white block mx-auto btn-primary">ADD TO CART</button>
            </div>
            </div>
        </div>
        </div>
  );
};

export default OrderPageCard;
