import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AddBlogs.css';

const AddBlogs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey);

    const handleAddBlog = data => {
        const today = format(new Date(), 'PP');
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const blogDetails = {
                        blogTitle: data.blogTitle,
                        description: data.description,
                        quote: data.quote,
                        tag: data.tag,
                        today: today,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/blogs', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(blogDetails)
                    })
                        .then(res => res.json())
                        .then(data => Swal.fire({
                            position: 'center center',
                            icon: 'success',
                            title: 'Blog Added Successfully',
                            showConfirmButton: false,
                            timer: 2500
                        }))
                    navigate('/dashboard');
                }
            })





    }
    return (
        <div className='container mx-auto'>
            <div className='mt-4'>
                <h1
                    style={{ color: '#D4A977', fontWeight: '300', letterSpacing: '2px' }}
                    className="mb-3">
                    Add New Blog
                </h1>
                <form
                    className='bg-black py-5 px-4 rounded'
                    onSubmit={handleSubmit(handleAddBlog)}>

                    <div className="form-control m-0 mb-3 row text-white"
                        style={{ backgroundColor: '#212121', border: '1px solid #806800' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Blog Title</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0 text-white"
                            style={{ outline: '0', backgroundColor: '#212121' }}
                            {...register("blogTitle")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row text-white"
                        style={{ backgroundColor: '#212121', border: '1px solid #806800' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Tag</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0 text-white"
                            style={{ outline: '0', backgroundColor: '#212121' }}
                            {...register("tag")}
                        />
                    </div>

                    <div className="form-control m-0 mb-3 row text-white"
                        style={{ backgroundColor: '#212121', border: '1px solid #806800' }}>
                        <label className="label p-0 col-1">
                            <span className=" label-text">Quote</span>
                        </label>
                        <input
                            type="text"
                            className="col-11 border-0 outline-0 text-white"
                            style={{ outline: '0', backgroundColor: '#212121' }}
                            {...register("quote")}
                        />
                    </div>

                    <div className="form-control m-0 text-white row mb-3"
                        style={{ backgroundColor: '#212121', border: '1px solid #806800' }}>
                        <label className="label col-1 p-0">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea outline-0 text-white border-0 w-100 col-11 p-0"
                            style={{ outline: '0', backgroundColor: '#212121' }}
                            {...register("description")}>
                        </textarea>
                    </div>

                    <div
                        style={{ backgroundColor: '#212121', border: '1px solid #806800' }}
                        className="form-control p-0">
                        <input 
                        style={{ backgroundColor: '#212121', border: '1px solid #806800' }}
                        type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="form-control form-control-md text-white" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>

                    <input
                        className='mt-4 bg-white px-4 py-2 rounded'
                        value="Add Blog"
                        type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddBlogs;