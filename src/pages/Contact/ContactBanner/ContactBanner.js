import React, { useRef } from "react";
import Swal from "sweetalert2";
import "./ContactBanner.css";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber, isValidNumberForRegion } from "libphonenumber-js";
import emailjs from "@emailjs/browser";

const ContactBanner = () => {
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
    <div className="contactBanner">
      <div className="container">
        <div className="overwriteTitleContact">
          <div className="specialLetterContactCCC">G</div>
          <div className="mainTitleContact">CONTACT US</div>
        </div>
        <form ref={form} onSubmit={handleSubmit(handleClientRequest)}>
          <div className="row contactUss">
            <div className="col-md-6 col-sm-12 px-4">
              <label htmlFor="">FIRST NAME</label>
              <br />
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Your First Name"
                {...register("firstName",
                  {
                    required: "First Name is required"
                  })}

              />
              {
                errors.firstName && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", }}>{errors.firstName?.message}</p>
              }            </div>
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
          <div className="row contactUss mt-4">
            <div className="col-md-6 col-sm-12 px-4">
              <label htmlFor="">E-MAIL</label>
              <br />
              <input
                type="email"
                // ref={emailRef}
                name=""
                id=""
                placeholder="Enter Your Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
              />
              {
                errors.email && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", }}>{errors.email?.message}</p>
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
                errors.phone && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", }}>{errors.phone?.message}</p>
              }            </div>
          </div>
          <div className="row px-3 contactUss mt-4">
            <label htmlFor="">I'M INTERESTED IN-</label>
            <br />
            <select
              // ref={choiceRef}
              style={{ backgroundColor: "transparent", color: "#fff", border: "1px solid rgb(124, 124, 124)" }}
              className="form-select mt-1 border-0"
              aria-label="Default select example"
              {...register("choice",
                {
                  required: "Must Choose your preference"
                })}
            >
              <option style={{ color: "#000" }} value="">
                Choose your preference
              </option>
              <option style={{ color: "#000" }} value="coloring">
                Coloring
              </option>
              <option style={{ color: "#000" }} value="rebonding">
                Rebonding
              </option>
              <option style={{ color: "#000" }} value="style">
                Style
              </option>
            </select>
            {
              errors.choice && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginBottom: "0", marginTop: "5px" }}>{errors.choice?.message}</p>
            }
          </div>
          <div className="row px-3 contactUss mt-4">
            <label className="mb-3" htmlFor="">
              MESSAGE
            </label>
            <textarea
              className="mx-2"
              // ref={messageRef}
              name=""
              id=""
              cols="30"
              rows="4"
              placeholder="Enter Your Message"
              {...register("message",
                {
                  required: "What is your message to us?"
                })}
            ></textarea>
            {
              errors.message && <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", marginTop: "5px" }}>{errors.message?.message}</p>
            }
          </div>
          <div className="row ms-1 mt-5 cuBtn">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactBanner;
