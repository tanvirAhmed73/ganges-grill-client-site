import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../Provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import usePublic from "../../CustomHooks/usePublic";

const LoginPage = () => {
  const axiosPublic = usePublic()
  const {signIn, signInWithGoogle} = useContext(AuthContext)
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const captchaRef = useRef(null);
    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])

    const handleLOginSumbit = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;  
        const value = captchaRef.current.value;
        if (validateCaptcha(value)==true) {
            // alert('Captcha Matched');
            signIn(email,password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              navigate(from)
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Log in SuccessFully",
                showConfirmButton: false,
                timer: 1500
              });
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        }
    
        else {
            setError('Captcha Does Not Match');
        }
    }

    const handleGoogelLogin = ()=>{
      signInWithGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const email = result.user.email;
        const name = result.user.displayName
        axiosPublic.post('/user',{email, name})
            .then(res =>{
              const result = res.data;
            })

        navigate(from)

        // save USer


        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log in SuccessFully",
          showConfirmButton: false,
          timer: 1500
        });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }


  return (
    <div>
      <div className="hero  min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mt-24 lg:mt-0 font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLOginSumbit} className="card-body ">
              <div className="form-control">
                
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
                
              </div>
              <div className="form-control">
                <div className="justify-center items-center "> 
                    <label className="">
                        <LoadCanvasTemplate />
                        <input
                    type="text"
                    name="captcha"
                    ref={captchaRef}
                    placeholder="Enter Captcha"
                    className="input mr-2 input-bordered"
                    required
                    />
                    </label>
                </div>
                
              </div>

                <label className="label underline">
                  <NavLink to={"/signUp"}>Need to create an account?</NavLink>
                  
                </label>
                  <p className="ml-1" >Sign in with Google:
                  <FaGoogle onClick={handleGoogelLogin} className="text-red-600 text-xl"/>
                  </p>
                <label className="ml-1 text-red-700">
                  {error ? error : ""}
                </label>


              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value={"SignUp"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
