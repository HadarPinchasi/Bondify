// JavaScript source code
function Friend({ friend }) {

    return (
        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2">
                <img src={friend.profilePic} className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} height='100%' alt="" />
            </span>
            {friend.firstName} {friend.lastName}

        </li>
    );
}

export default Friend;
