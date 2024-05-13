import React from "react";
import Title from "../../../Title/Title";
import { useForm } from "react-hook-form";
import usePublic from "../../../CustomHooks/usePublic";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = usePublic()
  const axiosSecure = useAxiosSecure()
  const onSubmit = async(data) => {
    // console.log(data);
    // upload to image get and url
    // send url to data base
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers:{
        "content-Type":'multipart/form-data'
      }
    })
    data.image = res.data.data.display_url
    // console.log(data)
    axiosSecure.post('/menuItem',data)
    .then(res=>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Recipe Added SuccessFully",
          showConfirmButton: false,
          timer: 1500
        });

      }
    })
  };

  return (
    <div>
      <Title title={"---What's new?---"} subtitle={"ADD AN ITEM"}></Title>

      <div className="w-3/4 mx-auto">
        {/* react hook form */}
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              placeholder="Type Recipe Name"
              className="input input-bordered w-full "
              {...register("name", {required:true})}
            />
          </label>

          <div className="md:flex gap-2">
            {/* category */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                {...register("category", {required:true})}
                defaultValue={'default'}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value={'default'}>
                  Select Food Category
                </option>
                <option value="salad">Salad</option>
                <option value="male">Soups</option>
                <option value="other">Pizza</option>
                <option value="other">Desert</option>
              </select>
            </label>

            {/* price */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Price*</span>
              </div> 
            <input
              placeholder="Enter Food Price"
              className="input input-bordered w-full "
              {...register("price", {required:true})}
            />
            </label>
          </div>

          {/* REcipe Details */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
            {...register("recipe", {required:true})}
              placeholder="Enter Recipe Details..."
              className="textarea mb-4 textarea-bordered textarea-lg w-full"
            ></textarea>
          </label>

          {/* choice file */}
          <input type="file" {...register("image", {required:true})} className="file-input mb-4 w-full max-w-xs" />

          <br />
          <input className="btn mb-4 btn-sm" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
