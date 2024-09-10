import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IState, IStudent, PartialUser } from "./types";
import axios from "axios";

const initialState: IState = {
	list: [],
};

export const getAllStudents = createAsyncThunk('students/get', async () => {
	const response = await axios.get('http://localhost:3004/students');
	return response.data;
});

export const addStudent = createAsyncThunk('students/add', async (student: PartialUser) => {
	const response = await axios.post('http://localhost:3004/students', student);
	return response.data;
});

const StudentsSlice = createSlice({
	name: 'students',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllStudents.fulfilled, (state, action) => {
				state.list = action.payload;
			});
		builder
			.addCase(addStudent.fulfilled, (state, action) => {
				state.list.push(action.payload);
			});
	},
});

export const studentsReducer = StudentsSlice.reducer;