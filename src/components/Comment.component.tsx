import { FC } from "react";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import PostComment from '../models/Post';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from "../models/LoginUser";

interface CommentComponentProps {
    comment: PostComment;
    user: User;
    onDeleteCommentClick?: (comment: PostComment) => void;
}
const CommentComponent: FC<CommentComponentProps> = (props: CommentComponentProps) => {
    const { comment, user } = props;

    const onDeleteCommentClick = () => {

        if (props.onDeleteCommentClick) {
            props.onDeleteCommentClick(comment);
        }
    };
    return <div>
        <ListItem alignItems="flex-start">
            <ListItemText data-testid="commentText"
                primary={`${comment.name} (${comment.email})`}
                secondary={
                    <>
                        {comment.body}
                    </>
                }
            />
            {
                user && user.role === "admin" ?
                    <IconButton data-testid="deleteCommentButton" onClick={onDeleteCommentClick} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton> :
                    null
            }

        </ListItem>
        <Divider />
    </div>;
}

export default CommentComponent;