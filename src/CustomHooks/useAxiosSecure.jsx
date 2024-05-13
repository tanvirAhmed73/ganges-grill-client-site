import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
  // request interceptor to add authorization headers for call api
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access_token");
      // console.log("request get by interceptor",token)
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
        async (error)=> {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const status = error.response.status;
      console.log(status)
      if(status === 401 || status === 403){
        await logOut();
        navigate('/login')
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
