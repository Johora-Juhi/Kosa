import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import './SendingInterest.css';

const SendingInterest = () => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const choiceRef = useRef();
    const messageRef = useRef();

    const handleClientRequest = e => {

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const choice = choiceRef.current.value;
        const message = messageRef.current.value;

        const newClientRequest = { firstName, lastName, email, phone, choice, message };
        console.log(newClientRequest)

        fetch('http://localhost:5000/interestedCustomer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newClientRequest)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successful',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div className='sendingInterest'>
            <div className="row m-0">
                <div className="col-lg-6 col-md-12 sendingInterestLeft">
                    <h1>WE'D LOVE TO <br /> HEAR FROM YOU</h1>
                </div>
                <div className="col-lg-6 col-md-12 d-flex align-items-center ">
                    <div className="sendingInterestRight w-100 px-5 py-5">
                        <form onSubmit={handleClientRequest}>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 px-4">
                                    <label htmlFor="">FIRST NAME</label><br />
                                    <input type="text" ref={firstNameRef} name="" id="" placeholder='Enter Your First Name' />
                                </div>
                                <div className="col-md-6 col-sm-12 px-4">
                                    <label htmlFor="">LAST NAME</label><br />
                                    <input type="text" ref={lastNameRef} name="" id="" placeholder='Enter Your Last Name' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 px-4">
                                    <label htmlFor="">E-MAIL</label><br />
                                    <input type="email" ref={emailRef} name="" id="" placeholder='Enter Your Email' />
                                </div>
                                <div className="col-md-6 col-sm-12 px-4">
                                    <label htmlFor="">PHONE</label><br />
                                    <input type="text" ref={phoneRef} name="" id="" placeholder='Enter Your Phone Number' />
                                </div>
                            </div>
                            <div className="row px-4">
                                <label htmlFor="">I'M INTERESTED IN-</label><br />
                                {/* <input className='mx-2' type="text" ref={choiceRef} name="" id="" placeholder='Short Cut / Long Cut / Baby Cut / Coloring' /> */}
                                <select ref={choiceRef} className="form-select border-0" aria-label="Default select example">
                                    <option value="">Choose your preference</option>
                                    <option value="coloring">Coloring</option>
                                    <option value="rebonding">Rebonding</option>
                                    <option value="style">Style</option>
                                </select>
                            </div>
                            <div className="row px-4 mt-4">
                                <label htmlFor="">MESSAGE</label>
                                <textarea className='mx-2' ref={messageRef} name="" id="" cols="30" rows="1" placeholder='Enter Your Message'></textarea>
                            </div>
                            <div className="row ms-1 px-4">
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