import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILesson, inputLesson, IRating, IState } from "./types";
import axios from "axios";

const initialState: IState = {
    lessons: [],
}

export const getAllLessons = createAsyncThunk('lessons/get', async () => {
    const response = await axios.get('http://localhost:3004/lessons');
    return response.data;
});

export const addLesson = createAsyncThunk('lessons/add', async (param: inputLesson) => {
    const response = await axios.post('http://localhost:3004/lessons', param);
    return response.data;
});

export const addRate = createAsyncThunk('lessons/rate', async (param: { lessonId: string; rating: IRating }) => {
    const { lessonId, rating } = param;
    const { data: lessons } = await axios.get('http://localhost:3004/lessons');
    const lesson = lessons.find((lesson: ILesson) => lesson.id === lessonId);

    lesson.ratings.push(rating);
    const response = await axios.patch(`http://localhost:3004/lessons/${lessonId}`, { ratings: lesson.ratings });
    return response.data;
});

const ClassBookSlice = createSlice({
    name: 'classbook',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllLessons.fulfilled, (state, action) => {
            state.lessons = action.payload;
        });
        builder.addCase(addLesson.fulfilled, (state, action) => {
            state.lessons.push(action.payload);
        });
        builder.addCase(addRate.fulfilled, (state, action) => {
            const updatedLesson = action.payload;
            const index = state.lessons.findIndex(lesson => lesson.id === updatedLesson.id);
            if (index !== -1) {
                state.lessons[index] = updatedLesson;
            };
        });
    },
})

export const classReducer = ClassBookSlice.reducer;
