import React, { useEffect, useState } from 'react';
import './Blog.css';
import { CiChat1 } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {

    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/comments')
            .then(res => res.json())
            .then(data => setComments(data));
    }, [])

    const commentCount = (comments.filter(s => s.blogId === blog._id).length);

    return (
        <div>
            <img className='img-fluid mb-4 mt-4' src={blog.image} alt="" />
            <div className="blogTag">{blog.tag}</div>
            <div className="blogTitle">{blog.blogTitle}</div>
            <div className="blogTimeComment">{blog.today} / by KOSATeam / <span> <CiChat1></CiChat1> {commentCount} </span> </div>
            <div className="blogDescription">{blog.description.slice(0, 300) + ' . .. ...'}</div>
            <Link to={`/blogs/${blog._id}`}><button className='blogButton'>Read article</button></Link>
        </div>
    );
};

export default Blog;