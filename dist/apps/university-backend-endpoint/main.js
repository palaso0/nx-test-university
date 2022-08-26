/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/university-backend-endpoint/src/app/CourseModel.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseTC = exports.Course = exports.CourseSchema = void 0;
const mongoose_1 = __webpack_require__("mongoose");
const graphql_compose_mongoose_1 = __webpack_require__("graphql-compose-mongoose");
const StudentModel_1 = __webpack_require__("./apps/university-backend-endpoint/src/app/StudentModel.ts");
exports.CourseSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    students: {
        type: [StudentModel_1.StudentSchema],
        required: false,
    },
    career: {
        type: String,
        required: true,
    },
});
exports.Course = mongoose_1.default.model('Course', exports.CourseSchema);
const customizationOtions = {};
exports.CourseTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Course, customizationOtions);


/***/ }),

/***/ "./apps/university-backend-endpoint/src/app/StudentModel.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentTC = exports.Student = exports.StudentSchema = void 0;
const mongoose_1 = __webpack_require__("mongoose");
const graphql_compose_mongoose_1 = __webpack_require__("graphql-compose-mongoose");
exports.StudentSchema = new mongoose_1.default.Schema({
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
});
exports.Student = mongoose_1.default.model('Student', exports.StudentSchema);
const customizationOtions = {};
exports.StudentTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Student, customizationOtions);


/***/ }),

/***/ "./apps/university-backend-endpoint/src/app/schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.schema = void 0;
const graphql_compose_1 = __webpack_require__("graphql-compose");
const StudentModel_1 = __webpack_require__("./apps/university-backend-endpoint/src/app/StudentModel.ts");
const CourseModel_1 = __webpack_require__("./apps/university-backend-endpoint/src/app/CourseModel.ts");
graphql_compose_1.schemaComposer.Query.addFields({
    studentOne: StudentModel_1.StudentTC.mongooseResolvers.findOne(),
    studentMany: StudentModel_1.StudentTC.mongooseResolvers.findMany(),
    studentCount: StudentModel_1.StudentTC.mongooseResolvers.count(),
    courseOne: CourseModel_1.CourseTC.mongooseResolvers.findOne(),
    courseMany: CourseModel_1.CourseTC.mongooseResolvers.findMany(),
    courseCount: CourseModel_1.CourseTC.mongooseResolvers.count(),
});
graphql_compose_1.schemaComposer.Mutation.addFields({
    studentCreateOne: StudentModel_1.StudentTC.mongooseResolvers.createOne(),
    studentUpdateOne: StudentModel_1.StudentTC.mongooseResolvers.updateOne(),
    studentUpdateMany: StudentModel_1.StudentTC.mongooseResolvers.updateMany(),
    studentRemoveOne: StudentModel_1.StudentTC.mongooseResolvers.removeOne(),
    courseCreateOne: CourseModel_1.CourseTC.mongooseResolvers.createOne(),
    courseUpdateOne: CourseModel_1.CourseTC.mongooseResolvers.updateOne(),
    courseUpdateMany: CourseModel_1.CourseTC.mongooseResolvers.updateMany(),
    courseRemoveOne: CourseModel_1.CourseTC.mongooseResolvers.removeOne(),
});
exports.schema = graphql_compose_1.schemaComposer.buildSchema();


/***/ }),

/***/ "./apps/university-backend-endpoint/src/main.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectDB = void 0;
const tslib_1 = __webpack_require__("tslib");
const apollo_server_express_1 = __webpack_require__("apollo-server-express");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const express = __webpack_require__("express");
const http = __webpack_require__("http");
const schema_1 = __webpack_require__("./apps/university-backend-endpoint/src/app/schema.ts");
const mongoose_1 = __webpack_require__("mongoose");
const mongodbURI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;
const connectDB = (mongodbURI, dbName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongodbURI || !dbName) {
        return Promise.reject('MongoDB URI or DB Name is not defined');
    }
    try {
        yield mongoose_1.default.connect(mongodbURI, { autoIndex: false, dbName }, (error) => {
            if (error) {
                console.log(error);
            }
        });
        console.log('🐣 mongodb database started');
        console.log(`🙉 dbURL `, mongodbURI);
        console.log(`🙉 dbName `, dbName);
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
});
exports.connectDB = connectDB;
function startApolloServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, exports.connectDB)(mongodbURI, dbName);
            const app = express();
            const httpServer = http.createServer(app);
            const server = new apollo_server_express_1.ApolloServer({
                schema: schema_1.schema,
                csrfPrevention: true,
                cache: 'bounded',
                plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
            });
            yield server.start();
            server.applyMiddleware({ app });
            yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        }
        catch (err) {
            throw new apollo_server_express_1.ApolloError('Something went wrong in Apollo');
        }
    });
}
const server = startApolloServer();
exports["default"] = server;


/***/ }),

/***/ "apollo-server-core":
/***/ ((module) => {

module.exports = require("apollo-server-core");

/***/ }),

/***/ "apollo-server-express":
/***/ ((module) => {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "graphql-compose":
/***/ ((module) => {

module.exports = require("graphql-compose");

/***/ }),

/***/ "graphql-compose-mongoose":
/***/ ((module) => {

module.exports = require("graphql-compose-mongoose");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "http":
/***/ ((module) => {

module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/university-backend-endpoint/src/main.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map