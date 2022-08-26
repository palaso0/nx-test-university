import { schemaComposer, SchemaComposer } from "graphql-compose"
import {StudentTC} from './StudentModel'
import {CourseTC} from './CourseModel'

schemaComposer.Query.addFields({
    studentOne: StudentTC.mongooseResolvers.findOne(),
    studentMany: StudentTC.mongooseResolvers.findMany(),
    studentCount: StudentTC.mongooseResolvers.count(),
    courseOne: CourseTC.mongooseResolvers.findOne(),
    courseMany: CourseTC.mongooseResolvers.findMany(),
    courseCount: CourseTC.mongooseResolvers.count(),
})

schemaComposer.Mutation.addFields({
    studentCreateOne: StudentTC.mongooseResolvers.createOne(),
    studentUpdateOne: StudentTC.mongooseResolvers.updateOne(),
    studentUpdateMany: StudentTC.mongooseResolvers.updateMany(),
    studentRemoveOne: StudentTC.mongooseResolvers.removeOne (),
    courseCreateOne: CourseTC.mongooseResolvers.createOne(),
    courseUpdateOne: CourseTC.mongooseResolvers.updateOne(),
    courseUpdateMany: CourseTC.mongooseResolvers.updateMany(),
    courseRemoveOne: CourseTC.mongooseResolvers.removeOne(),
    
})

export const schema = schemaComposer.buildSchema()


