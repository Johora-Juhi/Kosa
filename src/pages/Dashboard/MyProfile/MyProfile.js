import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import "./Myprofile.css";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { isValidPhoneNumber, isValidNumberForRegion } from "libphonenumber-js";
import { postcodeValidator } from "postcode-validator";
import Loading from "../../../components/loading/Loading";

const MyProfile = () => {
  useTitle('Profile')
  const { user } = useContext(AuthContext);
  const { data: profile = [], refetch, isLoading } = useQuery({
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
  const [country, setCountry] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    streetAddress: '',
    townCity: '',
    postcode: '',
    country: '',
  });
  useEffect(() => {
    if (!isLoading && profile) {
      // Set initial form values when profile data is available
      setFormValues({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        streetAddress: profile.streetAddress || '',
        townCity: profile.townCity || '',
        postcode: profile.postcode || '',
        country: profile.country || '',
      });
      
      // Select the correct country in the dropdown
      var selectElement = document.getElementById("inputState");
      const options = selectElement.getElementsByTagName("option");
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === profile.country) {
          options[i].selected = true;
          break;
        }
      }
    }
  }, [isLoading, profile]);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    streetAddress: '',
    townCity: '',
    postcode: '',
    country: '',
  });
  if (isLoading) {
    return <Loading></Loading>;
  };
  const updateprofile = async (event) => {
    event.preventDefault();
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      streetAddress: '',
      townCity: '',
      postcode: '',
      country: '',
    };

    const form = event.target;
    const name = form.name.value;
    const streetAddress = form.streetAddress.value;
    const country = form.country.value;
    const townCity = form.townCity.value;
    const postcode = form.postcode.value;
    const phone = form.phone.value;
    const email = profile.email;
    const role = profile.role;
    if (name.trim() === '') {
      newErrors.name = 'Name is required';
      changeBorder('name', true);
    }
    if (phone.trim() === '') {
      newErrors.phone = 'Phone Number is required';
      changeBorder('phone', true);
    } else {
      try {
        const isValid = isValidNumberForRegion(phone, country); // 'ZZ' is the country code for unknown region
        if (!isValid) {
          newErrors.phone = 'Invalid phone number, Must include country code';
          changeBorder('phone', true);
        }
      }
      catch (error) {
        console.error(error.message);
      }
    };   
    if (streetAddress.trim() === '') {
      newErrors.streetAddress = 'Street Address is required';
      changeBorder('streetAddress', true);
    }
    if (townCity.trim() === '') {
      newErrors.townCity = 'Town/City is required';
      changeBorder('townCity', true);
    }
    if (postcode.trim() === '') {
      newErrors.postcode = 'Post Code is required';
      changeBorder('postcode', true);
    }else {
      try {
        const isValid = postcodeValidator(postcode, country); // returns true for valid, throws error for invalid
    
        if (!isValid) {
          newErrors.postcode = 'Invalid Post code';
          changeBorder('postcode', true);
        }
      } catch (error) {
        // Handle the invalid country code error here
        console.error(error.message); // Log the error message for reference
        // Code to push data to the database even with invalid country code
        // ...
      }
    };   
    if (country.trim() === '') {
      newErrors.country = 'Country is required';
      changeBorder('country', true);
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === ''))  {
      
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
            const input = document.getElementsByTagName('input');
            for (let i = 0; i < input.length; i++){
              const parent = input[i].parentElement;
              parent.classList.remove('error-input');
            }
          }
        });
    }
   
  };
  const changeBorder = (id, hasError) => {
    const element = document.getElementById(id);
    if (hasError) {
      element.classList.add('error-input');
    } else {
      element.classList.remove('error-input');
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    }
  };
  const changeCountry = (id, hasError) => {
    const element = document.getElementById(id);
    if (hasError) {
      element.classList.add('error-input');
    } else {
      element.classList.remove('error-input');
      changeBorder('phone');
      changeBorder('postcode')
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="d-flex border m-4 ">
        <div className="w-25 p-5 border-end">
          <div className="imageIcon text-capitalize">{user?.displayName.charAt(0)}</div>
          <p
            className="text-center fw-bold fs-4 pt-3 text-capitalize"
            style={{ letterSpacing: "1px" }}
          >
            {user?.displayName}
          </p>
        </div>
        <div className="w-75 pt-5">
          <form className="pb-5 px-4 rounded" onSubmit={updateprofile}>
            <div className="form-control m-0 mb-3 row" id="name" style={{}}>
              <label className="label p-0 col-2">
                <span className=" label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={formValues.name}
                defaultValue={formValues.name}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyDown={() => changeBorder("name", false)}
              />
            </div>
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px", letterSpacing: "1.5px" }}>{errors.name }</p>
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
                placeholder={formValues.email}
                defaultValue={formValues.email}
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
                placeholder={formValues.phone}
                defaultValue={formValues.phone}
                onKeyUp={() => changeBorder("phone", false)}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
              />
            </div>
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px", letterSpacing: "1.5px" }}>{ errors.phone}</p>

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
                placeholder={formValues.streetAddress}
                defaultValue={formValues.streetAddress}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("streetAddress",false)}
              />
            </div>
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px", letterSpacing: "1.5px" }}>{ errors.streetAddress}</p>

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
                placeholder={formValues.townCity}
                defaultValue={formValues.townCity}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("townCity",false)}
              />
            </div>
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px", letterSpacing: "1.5px" }}>{ errors.townCity}</p>

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
                placeholder={formValues.postcode}
                defaultValue={formValues.postcode}
                className="col-10 border-0 outline-0"
                style={{ outline: "0" }}
                onKeyUp={() => changeBorder("postcode",false)}
              />
            </div>
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px", letterSpacing: "1.5px" }}>{ errors.postcode}</p>

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
                
                onChange={(e) => changeCountry("country",false)}
              >
                <option value={''}>Country</option>
                {country.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country) => (
                  <option value={country.cca2} className="ms-4">
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px", letterSpacing: "1.5px" }}>{errors.country}</p>
            
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
