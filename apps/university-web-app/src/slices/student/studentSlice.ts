import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IStudent {
    photo: string
    name: string
    lastName: string
    ci: string
    career: string
    _id: string
}

const initialState = {
    studentList: [] as IStudent[]
}

export const studentSlice:any = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudentList: (state, { payload }) => {
            // console.log('Payload: ', [...payload.data.getStudents]);
            state.studentList = [...payload.data.getStudents]
        },
        sortStudentList: (state,action) => {
            console.log('Orden: ', action.payload);
        }
    }
})

export const { setStudentList, sortStudentList } = studentSlice.actions;

export const selectStudentList = (state: any) => state

export default studentSlice.reducer;