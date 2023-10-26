import { format } from "date-fns";
import React from "react";
import Swal from "sweetalert2";

const EditingBlogModal = ({ blog, setEditBlog, refetch }) => {
  const { _id, blogTitle, description, quote, tag, image } = blog;
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const updateBlog = async (event) => {
    event.preventDefault();
    let newImage = image;

    const imageValue = event.target.image.files[0];

    if (imageValue) {
      const formData = new FormData();
      formData.append("image", imageValue);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
          method: "POST",
          body: formData,
        });

        const imgData = await response.json();

        if (imgData.success) {
          newImage = imgData.data.url;
        } else {
          console.error("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    const today = format(new Date(), "PP");
    const form = event.target;
    
    let newBlogTilte = form.blogTitle.value
    let newDescription = form.description.value
    let newQuote = form.quote.value
    let newTag = form.tag.value

    if (newBlogTilte.trim() === '') {
      newBlogTilte = blogTitle;
    }
    if (newDescription.trim() === '') {
      newDescription = description;
    }
    if (newQuote.trim() === '') {
      newQuote = quote;
    }
    if (newTag.trim() === '') {
      newTag = tag;
    }
    
    const updatedBlog = {
      blogTitle: newBlogTilte,
      description: newDescription,
      quote: newQuote,
      tag: newTag,
      image: newImage,
      today,
    };

    fetch(`https://hair-saloon-server.vercel.app/blog/${_id}`, {
    // fetch(`http://localhost:5000/blog/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center center",
            icon: "success",
            title: "Blog Updated Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div
      class="modal mt-5 fade"
      id="blogEditModal"
      tabindex="-1"
      aria-labelledby="blogEditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" style={{ width: "700px" }}>
          <div class="modal-header border-0">
            <h5 class="modal-title ps-2 text-black" id="blogEditModalLabel">
              {blogTitle}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              className=" pb-5 px-1 rounded"
              //   style={{
              //     border: "1px solid #e2e2e2",
              //   }}
              onSubmit={updateBlog}
            >
              <div
                className="form-control m-0 mb-3 row "
                style={{ border: "1px solid #e2e2e2" }}
              >
                <label className="label p-0 col-1">
                  <span className=" label-text">Title</span>
                </label>
                <input
                  name="blogTitle"
                  defaultValue={blogTitle}
                  placeholder={blogTitle}
                  type="text"
                  className="col-11 border-0 outline-0 "
                  style={{ outline: "0" }}
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
                  name="tag"
                  defaultValue={tag}
                  placeholder={tag}
                  type="text"
                  className="col-11 border-0 outline-0 "
                  style={{ outline: "0" }}
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
                  name="quote"
                  defaultValue={quote}
                  placeholder={quote}
                  type="text"
                  className="col-11 border-0 outline-0 "
                  style={{ outline: "0" }}
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
                  name="description"
                  defaultValue={description}
                  placeholder={description}
                  className="textarea outline-0  border-0 w-100 col-11 p-0"
                  style={{ outline: "0" }}
                ></textarea>
              </div>
              <div
                style={{ border: "1px solid #e2e2e2" }}
                className="form-control p-0"
              >
                <input
                  id="image"
                  name="image"
                  style={{
                    border: "1px solid #e2e2e2",
                  }}
                  type="file"
                  className="form-control form-control-md "
                />
              </div>
              {/* <div
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
          </div> */}

              <input
                id="close"
                className="mt-3 bg-black text-white px-5 py-2 rounded"
                data-bs-dismiss="modal"
                value="Edit Blog"
                type="submit"
              />
            </form>
          </div>
          {/* <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default EditingBlogModal;
