import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";
import EditingBlogModal from "./editingBlogModal/EditingBlogModal";
import './AllBlog.css'

const AllBlogs = () => {
  useTitle('Blogs');
  const [editBlog, setEditBlog] = useState([]);
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);

  const { data: blogsData = { blogs: [], count: 0 }, refetch } = useQuery(
    ["blogs", size, page], // Provide a unique key for the query based on the size
    async () => {
      const res = await fetch(`https://hair-saloon-server.vercel.app/blogs?page=${page}&size=${size}`);
      const data = await res.json();
      return data;
    }
  );
  const { blogs, count } = blogsData;
  const pages = Math.ceil(count / size);

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSize(selectedValue);
    setPage(0)
  };

  const handleDetetingUser = (blog) => {
    fetch(`https://hair-saloon-server.vercel.app/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Blog Removed",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <>
      <div className="container mx-auto mt-4">
        <h1
          style={{ color: "#D4A977", fontWeight: "300", letterSpacing: "2px" }}
          className="mb-3"
        >
          Blogs
        </h1>
        <div className="table-responsive border">
          <table className="table table-striped rounded mb-0">
            <thead>
              <tr>
                <th className="text-dark" scope="col">#</th>
                <th className="text-dark" scope="col">
                  Title
                </th>
                <th className="text-dark" scope="col">
                  Posted
                </th>
                <th className="text-dark" scope="col">
                  Tag
                </th>
                <th className="text-dark" scope="col">
                  BackID
                </th>
                <th className="text-dark" scope="col">
                  Edit
                </th>
                <th className="text-dark" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr key={blog._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{blog.blogTitle}</td>
                  <td>{blog.today}</td>
                  <td>{blog.tag}</td>
                  <td>{blog._id}</td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#blogEditModal"
                      // blog={blog}
                      onClick={() => { setEditBlog(blog) }}
                      style={{ backgroundColor: "#005967" }}
                      type="button"
                      className="btn btn-sm text-white py-0"
                    >
                      Make Change
                    </button>
                    {
                      editBlog &&
                      (
                        <EditingBlogModal
                          blog={editBlog}
                          setEditBlog={setEditBlog}
                          refetch={refetch}
                        ></EditingBlogModal>
                      )
                    }
                  </td>
                  <td>
                    <button
                      onClick={() => handleDetetingUser(blog)}
                      style={{ backgroundColor: "red" }}
                      type="button"
                      className="btn btn-sm text-white py-0"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <!-- ======= Footer tools ======= --> */}
          <div class="footer-tools px-4 py-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div class="list-items">
              Show
              <select onChange={handleSelectChange} style={{ marginLeft: "7px", marginRight: "7px", border: "2px solid #005967" }}>
                <option value="5" selected>5</option>
                <option value="10" >10</option>
                <option value="15">15</option>
              </select>
              entries
            </div>
            <div class="pagination mb-0">
              {[...Array(pages).keys()].map((number) => (
                <button
                  key={number}
                  className={page === number ? "active-page" : "page"}
                  onClick={() => setPage(number)}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
