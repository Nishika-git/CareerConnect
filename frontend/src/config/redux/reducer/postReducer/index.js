import { createSlice } from "@reduxjs/toolkit";
import { getAllComments, getAllPosts, postComment, delete_comment_of_user } from "../../action/postAction";

const initialState = {
    posts: [],
    isError: false,
    postFetched: false,
    loggedIn: false,
    isLoading: false,
    message: "",
    comments: [],
    postId: "",
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true
                state.message = "Fetching all the posts..."
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isError = false,
                    state.postFetched = true,
                    state.posts = action.payload.reverse()
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.postId = action.payload.post_id,
                    state.comments = action.payload.comments
            })
            .addCase(delete_comment_of_user.fulfilled, (state, action) => {
                state.comments = state.comments.filter(
                    (postComment) => postComment._id !== action.payload.deletedCommentId
                );
            })
    }
})

export const { resetPostId } = postSlice.actions

export default postSlice.reducer