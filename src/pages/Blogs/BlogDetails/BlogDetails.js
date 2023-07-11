import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CiChat1 } from "react-icons/ci";
import './BlogDetails.css';
import { AuthContext } from '../../../contexts/AuthProvider';
import Swal from 'sweetalert2';
import ShowComment from '../ShowComment/ShowComment';
import { useQuery } from '@tanstack/react-query';

const BlogDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const formBlogs = useLoaderData();
    const blog = (formBlogs[0]);
    
    const { user } = useContext(AuthContext);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const comment = useRef();

    const { data: comments = [], refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/comments`)
            const data = await res.json();
            return data;
        }
    });
    const commentCount = comments.filter(cC => cC.blogId === blog._id).length;

    const handleCommentPost = e => {
        const commentData = {
            userName: user.displayName,
            userEmail: user.email,
            blogId: blog._id,
            blogTitle: blog.blogTitle,
            comment: comment.current.value,
            postedMonth: months[new Date().getMonth()],
            postedYear: new Date().getFullYear()
        }
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Comment Posted',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    refetch();
                    e.target.reset();
                }
            })
        e.preventDefault();

    }
    return (
        <div>
            <div className="backGroundBlogDetails">
                <div className="container mx-auto">
                    <div className='backGroundBlogDetailsTag text-center'>{blog.tag}</div>
                    <div className='backGroundBlogDetailsTitle text-center'>{blog.blogTitle}</div>
                    <div className="backGroundBlogDetailsTimeComment text-center">{blog.today} / by KOSATeam / <span> <CiChat1></CiChat1> {commentCount}</span> </div>
                </div>
            </div>
            <div className='container mx-auto p-5 pb-0'>
                <div className='backGroundBlogDescription'>{blog.description}</div>
                <div className='backGroundBlogColon'>“</div>
                <div className='backGroundBlogQuote'>{blog.quote}</div>
                <hr />
            </div>
            <div className='mb-5'>
                <div className='container mx-auto px-5 mb-5'>
                    {
                        commentCount > 0 &&
                        <h1>Comments</h1>
                    }
                    <hr />
                </div>
                {
                    comments.filter(comment => comment.blogId === blog._id)
                        .map(showComment =>
                            <ShowComment
                                key={showComment._id}
                                showComment={showComment}>
                            </ShowComment>)
                }
            </div>
            <div className='container mx-auto blogDetailsComment px-5'>
                <h4>Leave a Reply</h4>
                <h5>Your email address will not be published. Required fields are marked *</h5>
                <h5>Comment *</h5>
                <form onSubmit={handleCommentPost}>
                    <textarea name="comment" ref={comment} id="comment" cols="120" rows="6"></textarea> <br />
                    <button type="submit" className='blogButton mt-4'>Post Comment</button>
                </form>
            </div>
        </div>
    );
};

export default BlogDetails;