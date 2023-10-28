import React, { useRef } from "react";
import "./Footer.css";
import footerLogo from "../../../../src/Images/HomePage/footerLogo.png";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
            position: 'center center',
            icon: 'success',
            title: 'Message sent',
            showConfirmButton: false,
            timer: 2500
          })
        },
        (error) => {
          console.error(error.text);
        }
      );
    e.target.reset();
  };


  return (
    <div className="footer">
      <div className="container py-5">
        <div className="row m-0 py-5">
          <div className="col-lg-6 col-md-12 py-3">
            <img src={footerLogo} alt="" />
          </div>
          <div className="col-lg-6 col-md-12 p-0 py-3 ps-3">
            <h1>
              Stay informed about our monthly promotions, products & more.
            </h1>
            <form ref={form} onSubmit={sendEmail}>
              <div className="row w-75 my-5 mx-0 emailSend">
                <div className="col-9 ps-0">
                  <input
                    className="w-100 ms-0"
                    type="email"
                    name="email"
                    id=""
                    placeholder="e-mail address here"
                  />
                </div>
                <div className="col-3 text-right">
                  <button type="submit">Send</button>
                </div>
              </div>
            </form>
            <div className="row links">
              <div className="col-md-5 col-sm-12">
                <Link to="/home">Home</Link>
                <br />
                <Link to="/about">About</Link>
                <br />
                <Link to="/services">Services</Link>
                <br />
                <Link to="/contact">Contact</Link>
                <br />
                <Link>Admin</Link>
              </div>
              <div className="col-md-7 col-sm-12">
                <h3>E: kosa@rainbow.com</h3>
                <h3>A: 347 Portobello Rd, London, UK</h3>
                <h3>T: +323 343 5425</h3>
              </div>
            </div>
          </div>
          <div className="ending">
            <h5>All Rights Reserved Kosa Hair Care 2022.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
