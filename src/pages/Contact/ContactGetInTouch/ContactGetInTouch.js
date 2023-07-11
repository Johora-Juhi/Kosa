import React from "react";
import "./ContactGetInTouch.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const ContactGetInTouch = () => {
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
          console.log(result.text);
          Swal.fire({
            position: "center center",
            icon: "success",
            title: "Message sent",
            showConfirmButton: false,
            timer: 2500,
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="contactGetInTouch">
      <div className="cgitContentM">
        <div className="container">
          <div className="row p-0 m-0 cgitContent">
            <div className="col-md-12 col-lg-6">
              <h2>GET IN TOUCH</h2>
              <h3 className="m-0 p-0">info@kosa.com</h3>
              <form ref={form} onSubmit={sendEmail}>
                <div className="row w-75 my-5 mx-0 emailSend">
                  <div className=" spsp col-9 ps-0">
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
            </div>
            <div className="col-md-12 col-lg-6">
              <p>
                New customer for color ? You want a big color change, or looking
                for advice ? Please book a free consultation first or give us a
                call to make an appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="iframeAbsolute"></div>
      <iframe
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        id="gmap_canvas"
        src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=East%20Delta%20Chittagong+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
};

export default ContactGetInTouch;
