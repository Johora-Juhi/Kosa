import React, { useEffect } from 'react';
import BlogBanner from '../BlogBanner/BlogBanner';
import Blogs from '../Blogs/Blogs';

const BlogComponent = () => {
    useEffect(() => {
        window.scrollTo(0,0)
        }, [])
    return (
        <div>
            <BlogBanner></BlogBanner>
            <Blogs></Blogs>
        </div>
    );
};

export default BlogComponent;