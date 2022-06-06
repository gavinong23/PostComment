import { FC, useState } from "react";
import PostComment from '../models/Post';
import { Button, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Post from "../models/Post";
import EditIcon from '@mui/icons-material/Edit';
import CommentComponent from "../components/Comment.component";
import { User } from "../models/LoginUser";

interface PostDetailComponentProps {
    comments: PostComment[];
    post: Post;
    user: User;
    onDeleteCommentClick?: (comment: PostComment) => void;
    onDeletePostClick?: (post: Post) => void;
    onSaveTitleButtonClick?: (post: Post) => void;
}
const PostDetailComponent: FC<PostDetailComponentProps> = (props: PostDetailComponentProps) => {
    const { comments, user, post } = props;
 
    const [title, setTitle] = useState(post.title);
    const [isEdit, setIsEdit] = useState(false);

    const onEditButtonClick = () => {
        setIsEdit(true);
    };

    const onSaveButtonClick = () => {
        const modifiedPost: Post = {
            ...post,
            title
        }
        if (props.onSaveTitleButtonClick) {
            props.onSaveTitleButtonClick(modifiedPost);
        }
        setTitle(title);
        setIsEdit(false);
    };

    const onDeletePostClick = () => {
        if (props.onDeletePostClick) {
            props.onDeletePostClick(post);
        }
    }

    const onDeleteCommentClick = (comment: PostComment) => {
        if (props.onDeleteCommentClick) {
            props.onDeleteCommentClick(comment);
        }
    }

    const onCancelButtonClick = () => {
        setIsEdit(false);
        setTitle(post.title);
    }

    const getTitle = () => {
        if (!isEdit) {
            return (
                <Stack direction="row" sx={{ width: '100%', marginRight: "36px", marginTop: "36px" }}>
                    <div>
                        <h1 style={{ textAlign: "start" }}>
                            {title}
                        </h1>
                    </div>
                    {
                        user && user.role === "admin" ? 
                        <Button data-testid="editPostTitleButton" onClick={onEditButtonClick}>
                            <EditIcon style={{ color: "black" }} />
                        </Button> : null
                    }

                </Stack>
            );
        } else {
            return (
                <Stack direction="row" sx={{ width: '100%', marginRight: "36px", marginTop: "36px" }}>
                    <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth>
                    </TextField>
                    <Button disabled={!title} onClick={onSaveButtonClick}>
                        Save
                    </Button>
                    <Button onClick={onCancelButtonClick}>
                        Cancel
                    </Button>
                </Stack>
            );
        }
    };
    return (
        <div style={{ margin: "32px", backgroundColor: "white" }}>
            <div style={{ marginLeft: "32px" }}>
                <Stack direction="row">
                    {
                        getTitle()
                    }
                    {
                        user && user.role === "admin" ? 
                        <Button data-testid="deletePostButton" style={{ position: "absolute", right: "25px" }} onClick={onDeletePostClick}>
                            <DeleteIcon style={{ color: "black" }} />
                        </Button>: null
                    }
                </Stack>
                <Stack>
                    <div style={{ textAlign: "start" }}>
                        {
                            post.body
                        }
                    </div>
                </Stack>
            </div>
            <Stack style={{ padding: "16px" }} textAlign="start">
                {
                    <div style={{ backgroundColor: "#F0F2F5" }}>
                        {
                            comments.map((comment: PostComment) => (
                                <CommentComponent key={comment.id} comment={comment} user={user} onDeleteCommentClick={onDeleteCommentClick} />
                            ))
                        }
                    </div>
                }
            </Stack>
        </div>
    );
}

export default PostDetailComponent;