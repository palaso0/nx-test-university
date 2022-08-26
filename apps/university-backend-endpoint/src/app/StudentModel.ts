import mongoose from "mongoose"
import { composeMongoose } from "graphql-compose-mongoose"
export interface IStudent {
    ci: string,
    name: string,
    lastName: string,
    career: string,
    photo: string
}

export interface IStudentDocument extends IStudent, mongoose.Document { }

export const StudentSchema = new mongoose.Schema({
    ci: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    career: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
})

export const Student = mongoose.model<IStudentDocument>('Student',StudentSchema)

const customizationOtions = {}

export const StudentTC = composeMongoose(Student, customizationOtions)