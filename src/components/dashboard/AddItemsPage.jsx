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

      <div className="mx-auto w-3/4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <label className="block w-full">
            <div className="mb-1.5">
              <span className="text-sm font-medium text-brand-dark">Recipe Name*</span>
            </div>
            <input
              placeholder="Type Recipe Name"
              className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
              {...register("name", { required: true })}
            />
          </label>

          <div className="mt-4 gap-3 md:flex">
            <label className="block w-full max-w-xs">
              <div className="mb-1.5">
                <span className="text-sm font-medium text-brand-dark">Category*</span>
              </div>
              <select
                {...register("category", { required: true })}
                defaultValue={"default"}
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
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

            <label className="block w-full max-w-xs">
              <div className="mb-1.5">
                <span className="text-sm font-medium text-brand-dark">Price*</span>
              </div>
              <input
                placeholder="Enter Food Price"
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
                {...register("price", { required: true })}
              />
            </label>
          </div>

          <label className="mt-4 block w-full">
            <div className="mb-1.5">
              <span className="text-sm font-medium text-brand-dark">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              placeholder="Enter Recipe Details..."
              className="mb-4 w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
            ></textarea>
          </label>

          <input
            type="file"
            {...register("image", { required: true })}
            className="mb-4 block w-full max-w-xs text-sm"
          />

          <br />
          <input
            className="mb-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
