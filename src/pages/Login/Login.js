import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import './Login.css';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                setLoginError(error.message);
            })

    }

    return (
        <div className='login py-5'>
            <div className="container mx-auto">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control border-0 w-full max-w-xs p-0 mb-2 mt-1">
                        <label className="label mb-1"> <span className="label-text">Username or email address <span style={{ color: 'red' }} >*</span> </span></label> <br />
                        <input
                            style={{ width: '100%', border: '1px solid #d7d7d7', outline: 'none' }}
                            type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input p-2" />
                        {errors.email && <p style={{ color: 'red', marginTop: '10px', fontSize: '13px', letterSpacing: '1.5px' }}>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control border-0 w-full max-w-xs p-0 mb-3">
                        <label className="label mb-1"> <span className="label-text ">Password <span style={{ color: 'red' }} >*</span></span></label> <br />
                        <input type="password"
                            style={{ width: '100%', border: '1px solid #d7d7d7', outline: 'none' }}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full p-2" />
                        {errors.password && <p style={{ color: 'red', marginTop: '10px', fontSize: '13px', letterSpacing: '1.5px' }}>{errors.password?.message}</p>}
                    </div>
                    <input style={{ backgroundColor: '#000', color: '#fff', marginTop: '20px', padding: '7px 25px' }} className='w-full' value="Login" type="submit" />
                    <div>
                        {loginError && <p style={{ color: 'red', marginTop: '10px', fontSize: '13px', letterSpacing: '1.5px' }}>{loginError}</p>}
                    </div>
                </form>
                <div className='mt-3'>
                    <Link style={{ textDecoration: 'none', color: '#d4a977' }} to="/register">New User? <span style={{color: 'blue', textDecoration: 'underline'}}>Please Register</span> </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;