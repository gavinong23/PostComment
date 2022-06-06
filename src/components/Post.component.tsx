import { FC } from "react";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Post from "../models/Post";


interface PostComponentProps {
    post: Post;
    onPostClick: (post: Post) => void;
}
const PostComponent: FC<PostComponentProps> = (props: PostComponentProps) => {
    const { post } = props;

    const onPostClick = () => {
        props.onPostClick(post);
    };
    return <><ListItem onClick={onPostClick} alignItems="flex-start">
        <ListItemText
            primary={post.title}
            secondary={
                <>
                    {post.body}
                </>
            }
        />
    </ListItem>
    <Divider />
    </>;
}

export default PostComponent;