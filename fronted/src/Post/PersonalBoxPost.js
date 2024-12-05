// JavaScript source code
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteFriendAction, sendFriendRequestService } from '../services/FriendReqService';
import { useAuth } from '../Authentication/AuthContext';

function PersonalBoxPost({ post, handleDeleteFriend, friendsList }) {
    const { token, myUser } = useAuth();
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [myFriend, SetMyFriend] = useState(null)
    const [requestSent, setRequestSent] = useState(false);
    const isOwnProfile = post.userName === myUser.userName;


    useEffect(() => {
        const isFriend = friendsList.some(friend => friend.userName === post.userName);
        SetMyFriend(isFriend);
    }, [friendsList, post.userName]);

    const deleteFriend = async () => {
        const success = await deleteFriendAction(myUser, post.userName, token, handleDeleteFriend);
        if (success) {
            SetMyFriend(false);
        }
    };

    const sendRequestFriend = async () => {
        const result = await sendFriendRequestService(token, myUser, post.userName);
        if (result.success) {
            setRequestSent(true);
        } else {
            if (result.message === 'You have already sent this user a friend request') {
                alert(result.message);
                setRequestSent(true);
            }
        }
    };

    const navigateToPersonalData = () => {
        if (modalRef.current) {
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
        navigate('/personalData', {
            state: {
                userName: post.userName,
            }
        });
    };

    const renderModalActions = () => {
        if (myFriend || isOwnProfile) {
            return (
                <div>
                    <button
                        className="btn btn-primary col-md-4"
                        onClick={navigateToPersonalData}
                    >
                        View {post.firstName}'s posts
                    </button>
                    {myFriend && !isOwnProfile && (
                        <button
                            className="btn btn-secondary col-md-6"
                            onClick={deleteFriend}
                        >
                            Remove {post.firstName} from friends
                        </button>
                    )}
                </div>
            );
        }

        return (
            <button
                className="btn btn-primary col-md-4"
                onClick={sendRequestFriend}
                disabled={requestSent}
            >
                Friend Request
            </button>
        );
    };


    return (
        <div>
            <button type="button" className="btn btn-transparent fw-bold fs-6"
                data-bs-toggle="modal" data-bs-target={"#personalBoxPost" + post.userName}>
                {post.firstName} {post.lastName}
            </button>
            <div className="modal fade" id={"personalBoxPost" + post.userName} tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true" ref={modalRef} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                <img src={post.profilePic} className="rounded-circle me-2"
                                    style={{ width: '30px', height: '30px' }}
                                    height='100%' alt="" /> {post.firstName} {post.lastName}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {renderModalActions()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalBoxPost;
