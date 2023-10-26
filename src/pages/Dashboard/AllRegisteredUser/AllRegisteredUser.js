import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../../components/loading/Loading";
import useTitle from "../../../hooks/useTitle";
import '../AllBlogs/AllBlog.css'

const AllRegisteredUser = () => {
  useTitle('Users');

  const {
    data: users = [],
    refetch,
    loading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://hair-saloon-server.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setusersPerPage] = useState(5); // Number of users to display per page

  // Calculate index of the last blog on the current page
  const indexOfLastBlog = currentPage * usersPerPage;
  // Calculate index of the first blog on the current page
  const indexOfFirstBlog = indexOfLastBlog - usersPerPage;

  // Slice the array of users to display only the users for the current page
  const currentusers = users.slice(indexOfFirstBlog, indexOfLastBlog);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleMakeAdmin = (id) => {
    fetch(`https://hair-saloon-server.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successful",
            showConfirmButton: false,
            timer: 2200,
          });
          refetch();
        }
      });
  };

  const handleDetetingUser = (user) => {
    console.log(user);
    fetch(`https://hair-saloon-server.vercel.app/users/${user._id}`, {
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
            title: "User Removed",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10); // Parse the selected value to an integer
    setusersPerPage(selectedValue);
    setCurrentPage(1); // Reset current page to 1 when the number of blogs per page is changed
  };
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="container mx-auto mt-4">
        <h1
          style={{ color: "#D4A977", fontWeight: "300", letterSpacing: "2px" }}
          className="mb-3"
        >
          All Users
        </h1>
        <div className="table-responsive border">
          <table className="table table-striped rounded">
            {/* <caption>List of users</caption> */}
            <thead>
              <tr>
                <th className="text-dark" scope="col">
                  #
                </th>
                <th className="text-dark" scope="col">
                  Name
                </th>
                <th className="text-dark" scope="col">
                  Email
                </th>
                <th className="text-dark" scope="col">
                  Sales Maneger
                </th>
                <th className="text-dark" scope="col">
                  Admin
                </th>
                <th className="text-dark" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {currentusers.map((user, i) => (
                <tr key={user._id}>
                  <th scope="row">{i + 1}</th>
                  <td className="text-capitalize">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      style={{ backgroundColor: "#005967" }}
                      className="btn btn-sm text-white py-0"
                    >
                      Make Sales Manager
                    </button>
                  </td>
                  <td>
                    {user?.role !== "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        style={{ backgroundColor: "#005967" }}
                        className="btn btn-sm text-white py-0"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <div
                        style={{ color: "#0ca1b7" }}
                        className="d-flex align-items-center"
                      >
                        <div>
                          <FaCheckCircle></FaCheckCircle>{" "}
                        </div>
                        <div className="ms-2">Admin</div>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
                      // onClick={() => handleDetetingUser(user)}
                      style={{ backgroundColor: "red" }}
                      type="button"
                      className="btn btn-sm text-white py-0"
                    >
                      Delete
                    </button>
                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered ">
                        <div class="modal-content p-2">
                          <div class="modal-header border-0">
                            <p class="" style={{ fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: "700", letterSpacing: "0px", marginBottom: "0", color: "rgb(51, 51, 51)" }} id="exampleModalLabel">Are you sure you want to delete!</p>
                            <button type="button" class="btn-xs btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="" style={{ fontSize: "16px", lineHeight: "1.75rem", fontWeight: "500", letterSpacing: "0px", paddingLeft: "16px", paddingBottom: "32px", color: "rgb(51, 51, 51)" }}>
                            If you delete {user.name} it can not be undone!
                          </div>
                          <div class="modal-footer border-0">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" onClick={() => handleDetetingUser(user)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
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
              {pageNumbers.map((number) => (
                <button onClick={() => paginate(number)} key={number}
                  className={currentPage === number ? "active-page" : "page"}>
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRegisteredUser;
