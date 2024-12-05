// services.js
export async function sendLoginRequest(formData) {
    try {
        const response = await fetch('http://localhost:12345/api/tokens', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status === 404) {
            return { success: false, message: 'Wrong username or password' };
        } else if (response.ok) {
            const data = await response.json();
            return { success: true, data: data.token };
        } else {
            return { success: false, message: 'Server error, please try again later' };
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
        return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    }
}
