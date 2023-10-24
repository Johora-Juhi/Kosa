import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import "./Myprofile.css";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  useTitle('Profile')
  const { user } = useContext(AuthContext);

  const { data: profile = [], refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`https://hair-saloon-server.vercel.app/profile/${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data[0];
    },
  });

  const selectedCountry = profile.country;
  const selectCountry = async () => {
    var selectElement = await document.getElementById("inputState");

    const options = selectElement.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectedCountry) {
        options[i].selected = true;
        break;
      }
    }
  };
  setTimeout(selectCountry, 100);

  const [country, setCountry] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  const updateprofile = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const streetAddress = form.streetAddress.value;
    const country = form.country.value;
    const townCity = form.townCity.value;
    const postcode = form.postcode.value;
    const phone = form.phone.value;
    const email = profile.email;
    const role = profile.role;

    const emptyFields = [];

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
    
      if (element.type !== 'submit' && element.value.trim() === '') {
        // Add the name of the empty input field to the array
        emptyFields.push(element.name);
    
        // Add a CSS class to highlight the empty input field
        const parent = element.parentElement;
        parent.classList.add('empty-input');
        parent.classList.remove('changeBorder');
      }
    }
    
    if (emptyFields.length > 0) {
      // Display an error message for all empty input fields using toast notification
      toast.error(`${emptyFields.join(', ')} ${emptyFields.length > 1 ? 'are' : 'is'} required`);
    } else {
      // Continue with form submission logic if all fields are filled
      // ...
      
      const updatedprofile = {
        name,
        email,
        phone,
        streetAddress,
        townCity,
        postcode,
        country,
        role,
      };

      fetch(`https://hair-saloon-server.vercel.app/users/${user?.email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedprofile),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            Swal.fire({
              position: "center center",
              icon: "success",
              title: "Profile Updated Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            refetch();
          }
        });
    }
  };
  const changeBorder = (id) => {
    document.getElementById(id).classList.add("changeBorder");
  };
  return (
    <div className="container mx-auto">
      <div className="d-flex border m-4 ">
        <div className="w-25 p-5 border-end">
          <div className="imageIcon">{user?.displayName.charAt(0)}</div>
          <p
            className="text-center fw-bold fs-4 pt-3"
            style={{ letterSpacing: "1px" }}
          >
            {user?.displayName}
          </p>
        </div>
        <div className="w-75 pt-5">
          <form className="pb-5 px-4 rounded" onSubmit={updateprofile}>
            <div className="form-control m-0 mb-3 row" id="name" style={{}}>
              <label className="label p-0 col-2">
                <span className=" label-text">Name </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={profile.name}
                defaultValue={profile.name}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("name")}
              />
            </div>

            <div
              className="form-control m-0 mb-3 row"
              style={{
                backgroundColor: "#fff",
                padding: "10px 10px",
              }}
            >
              <label className="label p-0 col-2">
                <span className=" label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder={profile.email}
                defaultValue={profile.email}
                disabled
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
              />
            </div>

            <div
              className="form-control m-0 mb-3 row inputField"
              id="phone"
              style={{}}
            >
              <label className="label p-0 col-2">
                <span className=" label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder={profile.phone}
                defaultValue={profile.phone}
                onKeyUp={() => changeBorder("phone")}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
              />
            </div>

            <div
              className="form-control m-0 mb-3 row"
              style={{
                backgroundColor: "#fff",
                padding: "10px 10px",
              }}
              id="streetAddress"
            >
              <label className="label p-0 col-2">
                <span className=" label-text">Street address</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                placeholder={profile.streetAddress}
                defaultValue={profile.streetAddress}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("streetAddress")}
              />
            </div>

            <div
              className="form-control m-0 mb-3 row"
              style={{
                backgroundColor: "#fff",
                padding: "10px 10px",
              }}
              id="townCity"
            >
              <label className="label p-0 col-2">
                <span className=" label-text">Town/City</span>
              </label>
              <input
                type="text"
                name="townCity"
                placeholder={profile.townCity}
                defaultValue={profile.townCity}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("townCity")}
              />
            </div>

            <div
              className="form-control m-0 mb-3 row"
              style={{
                backgroundColor: "#fff",
                padding: "10px 10px",
              }}
              id="postcode"
            >
              <label className="label p-0 col-2">
                <span className=" label-text">Post Code</span>
              </label>
              <input
                type="text"
                name="postcode"
                placeholder={profile.postcode}
                defaultValue={profile.postcode}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("postcode")}
              />
            </div>
            <div
              className="form-control m-0 mb-3 row"
              style={{
                backgroundColor: "#fff",
                padding: "0 0 0 10px ",
              }}
              id="country"
            >
              <label className="label p-0 col-2">
                <span className=" label-text">Country</span>
              </label>
              <select
                name="country"
                style={{ padding: "10px", width: "83%", outline: "0" }}
                id="inputState"
                className="col-10 form-select d-inline border-0 outline-0"
                onChange={() => changeBorder("country")}
              >
                <option value={''}>Country</option>
                {country.map((country) => (
                  <option defaultValue={profile.country} className="ms-4">
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>

            <input
              className=" bg-black text-white px-5 py-2 rounded"
              value="Save changes"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
