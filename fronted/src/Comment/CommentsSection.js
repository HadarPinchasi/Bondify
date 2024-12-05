import { useRef } from 'react';
import newCommentInfo from './newCommentInfo';
import PostButtons from '../Post/PostButtons';
import { useAuth } from '../Authentication/AuthContext';

function CommentsSection({ postId, commentsList, setCommentsList }) {
    const commentInputRef = useRef(null);
    const { myUser } = useAuth();
    const addComment = (commentContent) => {
        if (!commentContent.trim()) return;
        const newComment = newCommentInfo(commentsList.length, postId, commentContent, myUser);
        setCommentsList([...commentsList, newComment]);
        if (commentInputRef.current) commentInputRef.current.value = '';
    };

    return (
        <>
            <hr className="card-divider" />
            <PostButtons
                id={postId}
                commentsList={commentsList}
                addComment={addComment}
                commentInputRef={commentInputRef}
            />
        </>
    );
}

export default CommentsSection;
