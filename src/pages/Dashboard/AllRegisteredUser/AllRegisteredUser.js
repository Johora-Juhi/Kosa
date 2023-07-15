import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../../components/loading/Loading";
import useTitle from "../../../hooks/useTitle";

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
        <div className="table-responsive">
          <table className="table table-striped border rounded">
          <caption>List of users</caption>
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
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{user.name}</td>
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
                      onClick={() => handleDetetingUser(user)}
                      style={{ backgroundColor: "red" }}
                      type="button"
                      className="btn btn-sm text-white py-0"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
  List of users
  </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRegisteredUser;
