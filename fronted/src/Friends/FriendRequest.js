// JavaScript source code
import { useAuth } from '../Authentication/AuthContext.js';
import { approveFriendRequest, deleteFriendAction } from '../services/FriendReqService'

function FriendRequest({ request, handleDeleteReq, friendsList, setFriendsList }) {
    const { token, myUser } = useAuth();

    const approveReq = () => {
        approveFriendRequest(myUser, request, token, handleDeleteReq, setFriendsList, friendsList);
    };

    const deleteReq = () => {
        deleteFriendAction(myUser, request.userName, token, handleDeleteReq);
    };


    return (
        <div className="card-body mt-3 rounded d-flex flex-column " id='wannaShadow'>
            <h6 className="card-title mb-2">Friends request </h6>
            <div className="d-flex align-items-center">
                <img src={request.profilePic} className="rounded-circle me- 2" style={{ width: '40px', height: '40px' }} height='100%' alt="" />
                <div className="card card-body border-0" style={{ backgroundColor: 'transparent', width: '10rem' }}>{request.firstName} {request.lastName}
                    <h6 className="card-subtitle mb-2 text-body-secondary"> </h6>
                    <div className="row d-flex justify-content-between">
                        <button type="button" onClick={approveReq} className="btn btn-primary col-md-6" >Confirm</button>
                        <button type="button" onClick={deleteReq} className="btn btn-secondary col-md-6" >Delete</button>
                    </div>
                </div>
            </div>
            <hr className="card-divider" />
        </div>
    );
}
export default FriendRequest;