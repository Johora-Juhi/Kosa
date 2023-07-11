import React from 'react';
import './ShowComment.css';

const ShowComment = ({ showComment }) => {
    const { userName, postedMonth, postedYear, comment } = showComment;
    return (
        <div className='text-left container mx-auto px-5 py-2'>
            <div className='d-flex align-items-center gap-4'>
                <div className='nameIcon'>
                    {userName.charAt(0)}
                </div>
                <div>
                    <h5 className='mb-0'>{userName}</h5>
                    <h6 className='mb-0 text-secondary font-weight-light'>Posted on: {postedMonth}, {postedYear}</h6>
                </div>
            </div>
            <div className='showCComment'>
                {comment}
            </div>
            <hr />
        </div>
    );
};

export default ShowComment;