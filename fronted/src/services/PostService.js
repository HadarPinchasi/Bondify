export async function deletePost(userName, postId, token) {
    const response = await fetch('http://localhost:12345/api/users/' + userName + '/posts/' + postId, {
        method: "DELETE",
        headers: {
            'authorization': `bearer ${token}`,
        },
    });
    return response;
}

export async function savePostEdit(userName, postId, token, editingData) {
    const response = await fetch('http://localhost:12345/api/users/' + userName + '/posts/' + postId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': `bearer ${token}`,
        },
        body: JSON.stringify(editingData),
    });
    return response;
}

export const fetchUserPosts = async (userName, token) => {
    const response = await fetch(`http://localhost:12345/api/users/${userName}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + token
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export const sendPostData = async (myUser, token, content, photo, profilePic) => {
    try {
        const post = {
            firstName: myUser.firstName,
            lastName: myUser.lastName,
            content: content,
            userId: myUser._id,
            userName: myUser.userName,
            photo: photo,
            profilePic: profilePic
        };
        const res = await fetch('http://localhost:12345/api/users/:' + myUser.username + '/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            },
            body: JSON.stringify(post)
        });
        const postData = await res.json();
        if (res.status === 201) {
            return postData;
        }
        if (res.status === 409) {
            alert('link is invalid.');
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
};