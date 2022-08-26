import mongoose from "mongoose"
import { composeMongoose } from "graphql-compose-mongoose"
import { IStudent,StudentSchema } from "./StudentModel"

export interface ICourse {
    name: string,
    students: [IStudent],
    career: string,
}

export interface ICourseDocument extends ICourse, mongoose.Document { }

export const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    students: {
        type: [StudentSchema],
        required: false,
    },
    career: {
        type: String,
        required: true,
    },
})

export const Course = mongoose.model<ICourseDocument>('Course',CourseSchema)

const customizationOtions = {}

export const CourseTC = composeMongoose(Course, customizationOtions)