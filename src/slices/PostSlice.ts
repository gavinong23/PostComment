import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Post from "../models/Post";
import PostComment from '../models/Post';
import postService from "../services/Post.service";

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface PostState extends AsyncState {
    posts: Post[];
    comments: PostComment[];
    post: Post;
}

const initialPost: Post = {
    userId: 0,
    id: 0,
    title: "",
    body: "",
    postId: 0,
    name: "",
    email: ""
};

const initialState: PostState = {
    posts: [],
    comments: [],
    post: initialPost,
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const getPosts = createAsyncThunk('post', async () => {
    try {
        return await postService.getPosts();
    } catch (error) {
        console.log('Error: ', error);
    }
});

export const getPostDetail = createAsyncThunk('postDetail', async (id: number) => {
    try {
        return await postService.getPostById(id);
    } catch (error) {
        console.log('Error: ', error);
    }
});

export const getPostComments = createAsyncThunk('comment', async (postId: number) => {
    try {
        return await postService.getPostCommentByPostId(postId);
    } catch (error) {
        console.log('Error: ', error);
    }
});


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        deleteCommentById: (state, action: PayloadAction<PostComment>) => {
            const { payload } = action;
            const { comments } = state;
            const modifiedComments = comments.filter((comment) => comment.id !== payload.id);
            state.comments = modifiedComments;
        },
        deletePostById: (state, action: PayloadAction<Post>) => {
            const { payload } = action;
            const { posts } = state;
            const modifiedPosts = posts.filter((post) => post.id !== payload.id);
            state.posts = modifiedPosts;
        },
        updatePostTitleById: (state, action: PayloadAction<Post>) => {
            const { payload } = action;
            const { posts, post } = state;
            const postIndex = posts.findIndex((post) => post.id === payload.id);
            state.posts[postIndex].title = payload.title;
            post.title = payload.title;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload?.data || [];
            })
            .addCase(getPosts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.posts = [];
            }).addCase(getPostDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.post = action.payload?.data || initialPost;
            })
            .addCase(getPostDetail.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.post = initialPost;
            })
            .addCase(getPostComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = action.payload?.data || [];
            })
            .addCase(getPostComments.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.comments = [];
            });
    },
});



export const { 
    deleteCommentById, 
    deletePostById, 
    updatePostTitleById 
} = postSlice.actions;

export default postSlice.reducer;