
export const fetchUserData = async (username, token) => {
    try {
        const response = await fetch(`http://localhost:12345/api/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const fetchPosts = async (token) => {
    try {
        const response = await fetch('http://localhost:12345/api/articles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const fetchFriends = async (userName, token) => {
    try {
        const response = await fetch(`http://localhost:12345/api/users/${userName}/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch friends');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching friends:', error);
        throw error;
    }
};



