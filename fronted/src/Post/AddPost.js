import React, { useState, useCallback } from 'react';
import { sendPostData } from '../services/PostService.js';
import { useAuth } from '../Authentication/AuthContext.js';
import '../Feed/feed.css';

function AddPost({ postsList, setPostList }) {
    const { token, myUser } = useAuth();
    const [inputContent, setInputContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const onAddPost = async (content, photoFile) => {
        if (!content.trim() && !photoFile) {
            return;
        }
        let photo = '';
        if (photoFile) {
            photo = await readFileAsDataURL(photoFile);
        }
        try {
            const postData = await sendPostData(myUser, token, content, photo);
            setPostList([postData.article, ...postsList]);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const readFileAsDataURL = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const addPost = () => {
        onAddPost(inputContent, selectedFile);
        setInputContent('');
        setSelectedFile(null);
        setImagePreview('');
    };
    return (
        <div className="card mt-3" style={{ width: '40rem' }}>
            <div className="card-body d-flex flex-column" >
                <div className="d-flex align-items-center">
                    <img src={myUser.profilePic} className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} height='100%' alt="profile picture "></img>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="What are you thinking about?" aria-label="Recipient's username"
                            aria-describedby="button-addon2" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
                        <div className="input-group-append">
                        </div>
                        <button className="btn btn-primary" type="button" onClick={addPost}>Post</button>
                    </div>
                </div>
                {imagePreview && (
                    <img src={imagePreview} className="card-img-bottom" style={{ maxHeight: '500px' }} alt="Selected" />
                )}
                <hr className="card-divider" />
                <div className="row" id='buttonRow'>
                    <button type="button" className="btn btn-light col-md-4"><i className="bi bi-camera-video-fill m-2 " style={{ color: '#dc3545', fontSize: '1.5rem' }}></i>Live video</button>
                    <label className="btn btn-light col-md-4" > <i className="bi bi-file-earmark-image m-2" style={{ color: '#20c997', fontSize: '1.5rem' }}></i>
                        photo <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                    </label>
                    <button type="button" className="btn btn-light col-md-4"><i className="bi bi-emoji-smile m-2" style={{ color: 'orange', fontSize: '1.5rem' }}></i> Feeling/activity</button>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
