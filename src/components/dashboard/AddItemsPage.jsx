"use client";

import Title from "@/components/ui/Title";
import { useForm } from "react-hook-form";
import usePublic from "@/hooks/usePublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const imageHostingApi = imageHostingKey
  ? `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
  : null;

export default function AddItemsPage() {
  const { register, handleSubmit } = useForm();
  const axiosPublic = usePublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    if (!imageHostingApi) {
      Swal.fire({
        icon: "error",
        title: "Missing NEXT_PUBLIC_IMAGE_HOSTING_KEY",
      });
      return;
    }
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    data.image = res.data.data.display_url;
    axiosSecure.post("/menuItem", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Recipe Added SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Title title={"---What's new?---"} subtitle={"ADD AN ITEM"} />

      <div className="mx-auto w-3/4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              placeholder="Type Recipe Name"
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
          </label>

          <div className="gap-2 md:flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                {...register("category", { required: true })}
                defaultValue={"default"}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value={"default"}>
                  Select Food Category
                </option>
                <option value="salad">Salad</option>
                <option value="male">Soups</option>
                <option value="other">Pizza</option>
                <option value="other">Desert</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                placeholder="Enter Food Price"
                className="input input-bordered w-full "
                {...register("price", { required: true })}
              />
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              placeholder="Enter Recipe Details..."
              className="textarea textarea-bordered textarea-lg mb-4 w-full"
            ></textarea>
          </label>

          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input mb-4 w-full max-w-xs"
          />

          <br />
          <input className="btn btn-sm mb-4" type="submit" />
        </form>
      </div>
    </div>
  );
}
