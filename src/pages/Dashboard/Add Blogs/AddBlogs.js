import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./AddBlogs.css";
import useTitle from "../../../hooks/useTitle";

const AddBlogs = () => {
  useTitle("Add blog");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddBlog = (data) => {
    const today = format(new Date(), "PP");
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const blogDetails = {
            blogTitle: data.blogTitle,
            description: data.description,
            quote: data.quote,
            tag: data.tag,
            today: today,
            image: imgData.data.url,
          };
          fetch("https://hair-saloon-server.vercel.app/blogs", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(blogDetails),
          })
            .then((res) => res.json())
            .then((data) =>
              Swal.fire({
                position: "center center",
                icon: "success",
                title: "Blog Added Successfully",
                showConfirmButton: false,
                timer: 2500,
              })
            );
          navigate("/dashboard");
        }
      });
  };
  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <h1
          style={{ color: "#D4A977", fontWeight: "300", letterSpacing: "2px" }}
          className="mb-3"
        >
          Add New Blog
        </h1>
        <form
          className=" py-5 px-4 rounded"
          style={{
            border: "1px solid #e2e2e2",
          }}
          onSubmit={handleSubmit(handleAddBlog)}
        >
          <div
            className="form-control m-0 mb-3 row "
            style={{ border: "1px solid #e2e2e2" }}
          >
            <label className="label p-0 col-1">
              <span className=" label-text">Blog Title</span>
            </label>
            <input
              type="text"
              className="col-11 border-0 outline-0 "
              style={{ outline: "0" }}
              {...register("blogTitle")}
            />
          </div>

          <div
            className="form-control m-0 mb-3 row "
            style={{ border: "1px solid #e2e2e2" }}
          >
            <label className="label p-0 col-1">
              <span className=" label-text">Tag</span>
            </label>
            <input
              type="text"
              className="col-11 border-0 outline-0 "
              style={{ outline: "0" }}
              {...register("tag")}
            />
          </div>

          <div
            className="form-control m-0 mb-3 row "
            style={{ border: "1px solid #e2e2e2" }}
          >
            <label className="label p-0 col-1">
              <span className=" label-text">Quote</span>
            </label>
            <input
              type="text"
              className="col-11 border-0 outline-0 "
              style={{ outline: "0" }}
              {...register("quote")}
            />
          </div>

          <div
            className="form-control m-0  row mb-3"
            style={{ border: "1px solid #e2e2e2" }}
          >
            <label className="label col-1 p-0">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea outline-0  border-0 w-100 col-11 p-0"
              style={{ outline: "0" }}
              {...register("description")}
            ></textarea>
          </div>

          <div
            style={{ border: "1px solid #e2e2e2" }}
            className="form-control p-0"
          >
            <input
              style={{
                border: "1px solid #e2e2e2",
              }}
              type="file"
              {...register("image", {
                required: "Photo is Required",
              })}
              className="form-control form-control-md "
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>

          <input className="mt-3 bg-black text-white px-5 py-2 rounded" value="Add Blog" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
