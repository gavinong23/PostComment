import { List, Paper } from "@mui/material";
import { useEffect } from "react";
import PostComponent from "../components/Post.component";
import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
import Post from "../models/Post";
import { getPosts } from "../slices/PostSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { posts, isLoading } = useAppSelector((state) => state.post);

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const onPostClick = (post: Post) => {
        navigate(`/postDetailPage/${post.id}`);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div style={{margin:"36px"}}>
            <div>
                <Paper>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            posts && posts.map((post: Post) =>
                                <PostComponent key={post.id} post={post} onPostClick={onPostClick} />
                            )
                        }
                    </List>
                </Paper>
            </div>
        </div>
    );
}

export default HomePage;