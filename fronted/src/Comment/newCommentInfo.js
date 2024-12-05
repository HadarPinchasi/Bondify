// JavaScript source code

const newCommentInfo = (index, postId, content, myUser) => ({
    id: index + 1,
    Postid: postId,
    CommentprofilePicture: myUser.profilePic,
    CommentfirstName: myUser.firstName,
    CommentlastName: myUser.lastName,
    Commentcontent: content
});
export default newCommentInfo;