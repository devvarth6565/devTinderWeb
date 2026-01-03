import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        // Add this new reducer:
        removeUserFromFeed: (state, action) => {
            // Filter out the user whose _id matches the payload
            const newFeed = state.filter((user) => user._id !== action.payload);
            return newFeed;
        },
    },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;