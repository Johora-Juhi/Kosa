import React, { useRef } from "react";
import Swal from "sweetalert2";
import "./SendingInterest.css";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber, isValidNumberForRegion } from "libphonenumber-js";
import emailjs from "@emailjs/browser";

const SendingInterest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const form = useRef();

  const handleClientRequest = (data) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const phone = data.phone;
    const choice = data.choice;
    const message = data.message;

    const newClientRequest = {
      firstName,
      lastName,
      email,
      phone,
      choice,
      message,
    };

    fetch("https://hair-saloon-server.vercel.app/interestedCustomer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newClientRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          emailjs
            .sendForm(
              "service_v7efq22",
              "template_t4khxlp",
              form.current,
              "HcDRoU-wmqyzWpFtz"
            )
            .then(
              (result) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Message Sent",
                  showConfirmButton: false,
                  timer: 2000,
                });
                reset();
              },
              (error) => {
                console.error(error.text);
              }
            );

        }
      });
  };
  return (
    <div className="sendingInterest">
      <div className="row m-0">
        <div className="col-lg-6 col-md-12 sendingInterestLeft">
          <h1>
            WE'D LOVE TO <br /> HEAR FROM YOU
          </h1>
        </div>
        <div className="col-lg-6 col-md-12 d-flex align-items-center ">
          <div className="sendingInterestRight w-100 px-5 py-5">
            <form ref={form} onSubmit={handleSubmit(handleClientRequest)}>
              <div className="row">
                <div className="col-md-6 col-sm-12 px-4">
                  <label htmlFor="">FIRST NAME</label>
                  <br />
                  <input
                    type="text"
                    // ref={}
                    name=""
                    id=""
                    placeholder="Enter Your First Name"
                    {...register("firstName",
                      {
                        required: "First Name is required"
                      })}

                  />
                  {
                    errors.firstName && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginTop: "-15px" }}>{errors.firstName?.message}</p>
                  }
                </div>
                <div className="col-md-6 col-sm-12 px-4">
                  <label htmlFor="">LAST NAME</label>
                  <br />
                  <input
                    type="text"
                    // ref={lastNameRef}
                    name=""
                    id=""
                    placeholder="Enter Your Last Name"
                    {...register("lastName",
                    )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12 px-4">
                  <label htmlFor="">E-MAIL</label>
                  <br />
                  <input
                    type="email"
                    // ref={emailRef}
                    name=""
                    id=""
                    placeholder="Enter Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {
                    errors.email && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginTop: "-15px" }}>{errors.email?.message}</p>
                  }                </div>
                <div className="col-md-6 col-sm-12 px-4">
                  <label htmlFor="">PHONE</label>
                  <br />
                  <input
                    type="text"
                    // ref={phoneRef}
                    name=""
                    id=""
                    placeholder="Enter Your Phone Number"
                    {...register("phone",
                      {
                        validate: {
                          isValidPhoneNumber: (value) => {
                            if (!value) return true; // Allow empty value
                            return isValidPhoneNumber(value) || "Invalid. Must include country code.";
                          }
                        }
                      }
                    )}

                  />
                  {
                    errors.phone && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginTop: "-15px" }}>{errors.phone?.message}</p>
                  }
                </div>
              </div>
              <div className="row px-4">
                <label htmlFor="" style={{ paddingLeft: "0" }}>I'M INTERESTED IN-</label>
                <br />

                <select
                  // ref={choiceRef}
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    border: "2px solid rgb(211, 211, 211)"
                  }}
                  {...register("choice",
                    {
                      required: "Must Choose your preference"
                    })}
                >
                  <option value="">Choose your preference</option>
                  <option value="coloring">Coloring</option>
                  <option value="rebonding">Rebonding</option>
                  <option value="style">Style</option>


                </select>
                {
                  errors.choice && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginBottom: "0", marginTop: "15px", paddingLeft: "0" }}>{errors.choice?.message}</p>
                }
              </div>
              <div className="row px-4 mt-4">
                <label htmlFor="" style={{ paddingLeft: "0" }}>MESSAGE</label>
                <textarea
                  // ref={messageRef}
                  name=""
                  id=""
                  cols="30"
                  rows="1"
                  placeholder="Enter Your Message"
                  {...register("message",
                    {
                      required: "What is your message to us?"
                    })}
                ></textarea>
                {
                  errors.message && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginTop: "-15px", paddingLeft: "0" }}>{errors.message?.message}</p>
                }
              </div>
              <div className="row ms-3 ">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendingInterest;
