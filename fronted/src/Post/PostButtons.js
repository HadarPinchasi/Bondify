// PostButtons.js
import React from 'react';
import Comment from '../Comment/Comment';
import AddComment from '../Comment/AddComment';
import { FaRegShareSquare } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";

function PostButtons({ id, commentsList, addComment, commentInputRef }) {
    return (
        <div className="row">
            {/* Like Button */}
            <input type="checkbox" className="btn-check col-md-4 " id={`btn-check-outlined-${id}`} autoComplete="off" />
            <label className="btn btn-outline-primary col-md-4 border-0" id="likeButton" htmlFor={`btn-check-outlined-${id}`}>
                <i className="bi bi-hand-thumbs-up"></i> Like
            </label>
            {/* Comment Button */}
            <button type="button" className="btn btn-primary col-md-4 btn-light" data-bs-toggle="modal" data-bs-target={`#exampleModal-${id}`}>
                <i className="bi bi-chat"></i> Comment
            </button>
            {/* Comments Modal */}
            <div className="modal fade" id={`exampleModal-${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered justify-content-center">
                    <div className="modal-content" style={{ width: '45rem' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel" >Comments</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {commentsList
                                .filter(comment => comment.Postid === id)
                                .map(comment => <Comment key={comment.id} {...comment} />)
                            }
                            <AddComment addComment={addComment} commentInputRef={commentInputRef} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Share Dropdown */}
            <button className="btn btn-secondary dropdown-toggle col-md-4 btn btn-light " style={{ color: 'black' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FaRegShareSquare /> Share
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item"><FaRegShareSquare className=" m-2" /> Share now (Friends)</a></li>
                <li><a className="dropdown-item"><i className="bi bi-pencil-square m-2"></i> Share to Feed</a></li>
                <li><a className="dropdown-item"> <i className="bi bi-plus-circle m-2"></i> Share to your story (Friends)</a></li>
                <li><a className="dropdown-item"><i className="bi bi-messenger m-2"></i> Send in Messenger</a></li>
                <li><a className="dropdown-item"><i className="bi bi-whatsapp m-2"></i> Send in Whatsapp</a></li>
                <li><a className="dropdown-item"><GrGroup className=" m-2" />Share to a group</a></li>
                <li><a className="dropdown-item"> <i className="bi bi-people m-2"></i> Share on a friend's profile</a></li>
            </ul>

        </div>
    );
}

export default PostButtons;
