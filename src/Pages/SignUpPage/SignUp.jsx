import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import usePublic from "../../CustomHooks/usePublic";
import Swal from "sweetalert2";

const SignUp = () => {
  const axiosPublic = usePublic();
  
    const {register} = useContext(AuthContext)
    const [error, setError] = useState('');
  const navigate = useNavigate()
    const handleSubmit = e =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if(password !== confirmPassword){
          setError("Password Didn't Match")
          return 
        }
        
        const passwordPattern = /^(?=.*[0-9])(?=.*[-?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9-?!@#$%^&*\/\\]{8,30}$/;
        
        if(!passwordPattern.test(password)){
          setError("Password should 8 character, one uppercase, one lowercase, one number, and one special character.")
          return 
        }
        
        register(email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // save user to the database
            axiosPublic.post('/user',{name, email})
            .then(res =>{
              console.log(res.data)
            })

          navigate('/')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Created SuccessFully",
            showConfirmButton: false,
            timer: 1500
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          // ..
        });
        
        
    }
  return (
    <div>
      <div className="hero  min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mt-24 lg:mt-0 font-bold">Register now!</h1>
            
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                />
                <label className="label underline">
                  <NavLink to={'/login'} >Already have an account?</NavLink>
                </label>
                <label className="ml-1 text-red-700">
                    {
                        error? error : ""
                    }
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value={"SignUp"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
