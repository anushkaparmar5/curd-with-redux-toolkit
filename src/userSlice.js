import { createSlice } from '@reduxjs/toolkit';
import { generateUniqueId } from './utils';

const initialUsers = JSON.parse(localStorage.getItem('user')) || { users: [] };
const initialState = {
    ...initialUsers,
    isLoading: false,
    message: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.isLoading = true;
            const user = action.payload;
            state.users.push({ ...user, id: generateUniqueId() });
            localStorage.setItem('user', JSON.stringify(state));
            state.message = {
                type: "success",
                text: "User added."
            };
        },
        editUser: (state, action) => {
            state.isLoading = true;
            const updatedUser = action.payload;
            const userIndex = state.users.findIndex((user) => user.id === updatedUser?.id);
            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
                localStorage.setItem('user', JSON.stringify(state));
                state.message = {
                    type: "success",
                    text: "User updated."
                };
            }
        },
        deleteUser: (state, action) => {
            state.isLoading = true;
            const userId = action.payload;
            state.users = state.users.filter((user) => user.id !== userId);
            localStorage.setItem('user', JSON.stringify(state));
            state.message = {
                type: "warning",
                text: "User deleted."
            };
        },
        resetMessage: (state, action) => {
            state.message = {};
        },
        resetLoading: (state, action) => {
            state.isLoading = false;
        }
    },
});

export const { addUser, editUser, deleteUser, resetMessage, resetLoading } = userSlice.actions;
export const selectUsers = (state) => state.user.users;
export const getLoading = (state) => state.user.isLoading;
export const getToastMessage = (state) => state.user.message;

export default userSlice.reducer;
