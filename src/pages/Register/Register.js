import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
import "./Register.css";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  useTitle('Register');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
    window.location.reload(true);
  }

  const handleSignUp = (data) => {
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then((result) => {
            console.log(result);
            saveUser(data.name, data.email);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };

    fetch("https://hair-saloon-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="register py-5">
      <div className="container mx-auto">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs p-0 border-0">
            <label className="label mb-1">
              {" "}
              <span className="label-text">Name</span>
            </label>{" "}
            <br />
            <input
              style={{
                width: "100%",
                border: "1px solid #d7d7d7",
                outline: "none",
              }}
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full  p-2"
            />
            {errors.name && (
              <p
                style={{
                  color: "red",
                  marginTop: "10px",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                }}
              >
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs p-0 border-0">
            <label className="label mb-1 mt-3">
              {" "}
              <span className="label-text">Email</span>
            </label>{" "}
            <br />
            <input
              style={{
                width: "100%",
                border: "1px solid #d7d7d7",
                outline: "none",
              }}
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs  p-2"
            />
            {errors.email && (
              <p
                style={{
                  color: "red",
                  marginTop: "10px",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-control w-full p-0 border-0">
            <label className="label mb-1 mt-3">
              {" "}
              <span className="label-text">Password</span>
            </label>{" "}
            <br />
            <input
              style={{
                width: "100%",
                border: "1px solid #d7d7d7",
                outline: "none",
              }}
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="input input-bordered w-full  p-2"
            />
            {errors.password && (
              <p
                style={{
                  color: "red",
                  marginTop: "10px",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>
          <input
            style={{
              backgroundColor: "#000",
              color: "#fff",
              marginTop: "20px",
              padding: "7px 25px",
            }}
            className="w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p
          className="mt-3 pb-3"
          style={{ textDecoration: "none", color: "#d4a977" }}
        >
          Already have an account? <Link to="/login">Please Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
