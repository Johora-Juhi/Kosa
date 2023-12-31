import React, { useEffect, useRef, useState } from "react";
import Blog from "../Blog/Blog";
import './Blogs.css'

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    fetch(
      `https://hair-saloon-server.vercel.app/blogs?page=${page}&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setCount(data.count);
        window.scroll(0, 0);
        // document.body.style.scrollBehavior = 'unset';

      });
  }, [page, size]);
  const pages = Math.ceil(count / size);
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10); // Parse the selected value to an integer
    setSize(selectedValue);
    setPage(0); // Reset current page to 1 when the number of blogs per page is changed
  };
  return (
    <div className="container mx-auto py-5">
      <div className="row">
        <div className="col-9">
          {blogs?.map((blog) => (
            <Blog key={blog._id} blog={blog}></Blog>
          ))}
          
        </div>
        <div className="col-3 ps-4">
          <h1
            className="mt-3 mb-5"
            style={{
              color: "#D4A977",
              fontWeight: "300",
              letterSpacing: "2px",
            }}
          >
            Recent Posts
          </h1>
          {blogs?.map((blog) => (
            <div className="d-flex gap-2 align-items-center mb-5">
              <div>
                <div
                  style={{ width: "80px", height: "80px", overflow: "hidden" }}
                >
                  <img
                    style={{ width: "160px", marginLeft: "-45px" }}
                    className=""
                    src={blog.image}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h6 style={{ fontWeight: "400", letterSpacing: "1px" }}>
                  {blog.blogTitle}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination d-flex justify-content-center ">
            
            {[...Array(pages).keys()].map((number) => (
              <button
                key={number}
                className={page === number ? "selected" : ""}
                onClick={() => setPage(number)}
              >
                {number+1}
              </button>
            ))}
            <select onChange={handleSelectChange}>
              
              <option value="5" selected>5</option>
              <option value="10">
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
    </div>
  );
};

export default Blogs;
