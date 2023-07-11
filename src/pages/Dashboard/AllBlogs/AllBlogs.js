import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';


const AllBlogs = () => {
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/blogs');
            const data = await res.json();
            return data;
        }
    });


    const handleDetetingUser = blog => {
        console.log(blog);
        fetch(`http://localhost:5000/blogs/${blog._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: 'User Removed',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })
    }

    return (
        <>
            <div className="container mx-auto mt-4">
                <h1 style={{ color: '#D4A977', fontWeight: '300', letterSpacing: '2px' }} className="mb-3">Blogs</h1>
                <div className="table-responsive">
                    <table className="table table-striped border rounded" >
                        <thead>
                            <tr>
                                <th className='text-dark' scope="col"></th>
                                <th className='text-dark' scope="col">Title</th>
                                <th className='text-dark' scope="col">Posted</th>
                                <th className='text-dark' scope="col">Tag</th>
                                <th className='text-dark' scope="col">BackID</th>
                                <th className='text-dark' scope="col">Edit</th>
                                <th className='text-dark' scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blogs.map((blog, i) => <tr key={blog._id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{blog.blogTitle}</td>
                                    <td>{blog.today}</td>
                                    <td>{blog.tag}</td>
                                    <td>{blog._id}</td>
                                    <td>
                                        <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            // onClick={() => { handleEditUser(blog) }}
                                            style={{ backgroundColor: '#000196' }}
                                            type="button"
                                            className="btn btn-sm text-white py-0">                                                                                     
                                            Make Change
                                        </button>
                                    </td>
                                    <td><button onClick={() => handleDetetingUser(blog)} style={{ backgroundColor: 'red' }} type="button" className="btn btn-sm text-white py-0">Remove</button></td>
                                    
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* {
                <EditingBlogModal>
                    blog={blog}
                </EditingBlogModal>
            } */}
        </>
    );
};

export default AllBlogs;