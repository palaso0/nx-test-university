import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStudents } from '../../services/queries'

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

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudentList: (state, { payload }) => {
            console.log('Payload: ', [...payload.data.getStudents]);
            state.studentList = [...payload.data.getStudents]
        },
        refreshStudentsList: (state) => {
            state.studentList = [...state.studentList]
        }
    }
})

export const { setStudentList, refreshStudentsList } = studentSlice.actions;

export const selectDisplayOperation = (state: any) => state

export default studentSlice.reducer;



// async function getAlgo() {
//     let response = await fetch("http://localhost:3000/students", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     return response.json();
// }

// getAlgo()
//     .then(
//         res => {
//             dispatch(updateStudentsList(res));
//         }
//     );