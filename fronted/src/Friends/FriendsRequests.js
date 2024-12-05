// JavaScript source code
import { useState, useEffect } from 'react';
import FriendRequest from "./FriendRequest";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { getRequests } from '../services/FriendReqService';
import { useAuth } from '../Authentication/AuthContext';

function FriendsRequests({ friendsList, setFriendsList }) {
    const [userRequestsList, setUserRequestsList] = useState([]);
    const { token, myUser } = useAuth();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const requestData = await getRequests(myUser.userName, token);
                setUserRequestsList(requestData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchRequests();
    }, [myUser, token]);

    const handleDeleteReq = (userName) => {
        const updatedReqList = userRequestsList.filter(request => request.userName !== userName);
        setUserRequestsList(updatedReqList);
    };

    return (
        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2" style={{ color: '#0dcaf0' }}>
                <MdOutlineEmojiPeople />
            </span>
            <button type="button" className="btn btn-transparent" data-bs-toggle="modal" data-bs-target="#personalBoxRequests">
                My Friend Requests
            </button>
            <div className="modal fade" id="personalBoxRequests" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Your Friends Requests
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {userRequestsList.map((request) => (
                                <FriendRequest key={request._id}
                                    request={request}
                                    handleDeleteReq={handleDeleteReq}
                                    friendsList={friendsList}
                                    setFriendsList={setFriendsList} />
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );

}

export default FriendsRequests;
