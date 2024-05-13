import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://ganges-grill-server-site.vercel.app/'  
})

const usePublic = () => {
    return axiosPublic;
};

export default usePublic;