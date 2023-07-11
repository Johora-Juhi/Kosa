import React, { useEffect, useState } from 'react';
import Blog from '../Blog/Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [])
    return (
        <div className='container mx-auto py-5'>
            <div className="row">
                <div className="col-9">
                    {
                        blogs?.map(blog => <Blog key={blog._id} blog={blog}></Blog>)
                    }
                </div>
                <div className="col-3 ps-4">
                    <h1 className="mt-3 mb-5" style={{ color: '#D4A977', fontWeight: '300', letterSpacing: '2px' }}>Recent Posts</h1>
                    {
                        blogs?.map(blog =>
                            <div className='d-flex gap-2 align-items-center mb-5'>
                                <div>
                                    <div style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                                        <img style={{ width: '160px', marginLeft: '-45px' }} className='' src={blog.image} alt="" />
                                    </div>
                                </div>
                                <div><h6 style={{ fontWeight: '400', letterSpacing: '1px' }}>{blog.blogTitle}</h6></div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blogs;