import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthProvider';

const CheckoutForm = () => {

    let cart = useSelector(state => state.cart);
    let cartDetails = cart.cart;

    const { user, logOut } = useContext(AuthContext);
    const userEmail = user?.email;

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const eachProductCost = (cartDetails.map(c => (c.price * c.quantity)));
    const subTotal = (eachProductCost.reduceRight((acc, cur) => acc + cur, 0)).toFixed(2);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [country, setCountry] = useState([]);
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountry(data))
    }, [])

    const handlePlaceOrder = data => {
        const orderDetails = {
            firstName: data.firstName,
            lastName: data.lastName,
            companyName: data.companyName,
            streetAddress: data.streetAddress,
            country: data.country,
            townCity: data.townCity,
            postcode: data.postcode,
            phone: data.phone,
            email: data.email,
            orderedItems: cartDetails,
            totalAmount: subTotal,
            userEmail: userEmail
        }
        fetch('http://localhost:5000/orderPlace', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged === true ?
                    Swal.fire({
                        position: 'center center',
                        icon: 'success',
                        title: 'Order Placed',
                        showConfirmButton: false,
                        timer: 2500
                    }) :
                    Swal.fire({
                        position: 'center center',
                        icon: 'warning',
                        title: 'Please Login Again',
                        showConfirmButton: false,
                        timer: 3500
                    })
                data.acknowledged !== true && handleLogOut()
            })
        navigate('/');
    }

    return (
        <div className='container mx-auto'>
            <div className='mt-4'>
                <h1
                    style={{ color: '#000', fontWeight: '300', letterSpacing: '2px' }}
                    className="ps-4 pt-5">
                    Billing details
                </h1>
                <form
                    className='pb-5 px-4 rounded'
                    onSubmit={handleSubmit(handlePlaceOrder)}>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">First Name</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("firstName")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Last Name</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("lastName")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-2">
                            <span className=" label-text">Company Name</span>
                        </label>
                        <input
                            type="text"
                            className="col-10 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("companyName")}
                        />
                    </div>

                    <select
                        {...register('country')}
                        style={{ padding: '10px' }} id="inputState" class="form-control mb-3">
                        <option selected>Country</option>
                        {
                            country.map(country => <option>{country.name.common}</option>)
                        }
                    </select>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Street address</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("streetAddress")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Town/City</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("townCity")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Post Code</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("postcode")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Phone</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("phone")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row"
                        style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', padding: '10px 10px' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="col-11 border-0 outline-0"
                            style={{ outline: '0' }}
                            {...register("email")}
                        />
                    </div>

                    <h1
                        style={{ color: '#000', fontWeight: '300', letterSpacing: '2px' }}
                        className="pt-4">
                        Your Order
                    </h1>
                    <div className='d-flex justify-content-between border-top border-bottom px-2'>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>Product Price</div>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>£{subTotal}</div>
                    </div>
                    <div className='d-flex justify-content-between  align-items-center border-bottom px-2 py-3'>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>Shipping</div>
                        <div className='d-flex flex-column text-right' style={{ fontSize: "17px" }}>
                            <div className='py-2'>Free Shipping</div>
                            <div className='py-2'>Shipping options will be updated during checkout.</div>
                            <div className='py-2'>Calculate shipping</div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between border-bottom px-2'>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3 fw-bold'>Total Amount</div>
                        <div style={{ fontSize: "17px", color: 'black' }} className='mb-0 py-3 fw-bold'>£{subTotal}</div>
                    </div>

                    <input
                        className='mt-5 mb-4 bg-black text-white px-5 py-2 rounded'
                        value="Place Order"
                        type="submit" />
                </form>
            </div >
        </div >
    );
};

export default CheckoutForm;