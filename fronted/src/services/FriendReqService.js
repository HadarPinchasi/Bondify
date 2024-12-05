export const getRequests = async (userName, token) => {
    try {
        const response = await fetch('http://localhost:12345/api/users/' + userName
            + '/friendsRequest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const requestData = await response.json();
        return requestData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};


export const approveFriendRequest = async (myUser, request, token, handleDeleteReq, setFriendsList, friendsList) => {
    try {
        const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends/' +
            request.userName,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': 'bearer ' + token
                },
            });
        if (response.ok) {
            handleDeleteReq(request.userName);
            setFriendsList([...friendsList, {
                userName: request.userName, firstName: request.firstName,
                lastName: request.lastName, profilePic: request.profilePic
            }]);
        }
        console.log(response);
    } catch (error) {
        console.error('Error approving request:', error);
    }
}


export const deleteFriendAction = async (myUser, userName, token, handleDelete) => {
    try {
        const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends/' +
            userName,
            {
                method: "DELETE",
                headers: {
                    'authorization': 'bearer ' + token
                },
            });
        if (response.ok) {
            handleDelete(userName);
            return true
        }
        console.log(response);
    } catch (error) {
        console.error('Error deleting request:', error);
        return false;
    }
}


export const sendFriendRequestService = async (token, myUser, postUserName) => {
    try {
        const response = await fetch(`http://localhost:12345/api/users/${postUserName}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': `bearer ${token}`,
            },
            body: JSON.stringify({
                userName: myUser.userName,
            }),
        });

        if (response.ok) {
            return { success: true };
        } else if (response.status === 403) {
            return { success: false, message: 'You have already sent this user a friend request' };
        } else {
            return { success: false, message: 'Problem occurred while sending friend request' };
        }
    } catch (error) {
        console.error("Error sending friend request:", error);
        return { success: false, message: 'Network error or server is down' };
    }
};
