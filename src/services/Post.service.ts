import axios from 'axios';
import Post from '../models/Post';
import PostComment from '../models/Post';

const getPosts = async () => {
    const response = await axios.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts`
    );
    return response;
};

const getPostById = async (id: number) => {
    const response = await axios.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response;
};

const getPostCommentByPostId = async (postId: number) => {
    const response = await axios.get<PostComment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response;
};

const postService = {
    getPosts,
    getPostById,
    getPostCommentByPostId
};

export default postService;