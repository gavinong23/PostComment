import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
import { deleteCommentById, deletePostById, getPostComments, getPostDetail, updatePostTitleById } from "../slices/PostSlice";
import CircularProgress from '@mui/material/CircularProgress';
import PostDetailComponent from "../components/PostDetail.component";
import PostComment from '../models/Post';
import Post from "../models/Post";

const PostDetailPage = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const { post, comments, isLoading } = useAppSelector((state) => state.post);
    const { user } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getPostDetail(Number(id)));
    }, []);

    useEffect(() => {
        dispatch(getPostComments(Number(post.id)));
    }, []);

    const onDeletePostClick = () => {
        dispatch(deletePostById(post));
        navigate('/');
    }
    
    const onDeleteCommentClick = (comment: PostComment) => {
        dispatch(deleteCommentById(comment));
    }
    
    const onSaveTitleButtonClick = (post: Post) => {
        dispatch(updatePostTitleById(post));
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <PostDetailComponent
            post={post}
            comments={comments}
            user={user}
            onDeleteCommentClick={onDeleteCommentClick}
            onDeletePostClick={onDeletePostClick}
            onSaveTitleButtonClick={onSaveTitleButtonClick} />
    );
}

export default PostDetailPage;