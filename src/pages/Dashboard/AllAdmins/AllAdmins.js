import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";

const AllAdmins = () => {
  useTitle('Admins');

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://hair-saloon-server.vercel.app/users/admins"
      );
      const data = await res.json();
      return data;
    },
  });
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

  return (
    <div>
      <div className="container mx-auto mt-4">
        <h1
          style={{ color: "#D4A977", fontWeight: "300", letterSpacing: "2px" }}
          className="mb-3"
        >
          All Admin
        </h1>
        <div className="table-responsive">
          <table className="table table-striped border rounded">
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
                  BackID
                </th>
                <th className="text-dark" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={user._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user._id}</td>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAdmins;
