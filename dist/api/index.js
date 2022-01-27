"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./v1/routes/index");
const errorHandler_1 = require("./v1/middlewares/errors/errorHandler");
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/v1', index_1.routerV1);
app.use(errorHandler_1.errorHandler);
var rootMessage;
if (process.env.NODE_ENV === "DEV") {
    rootMessage = `Server running on port ${port} in development .`;
}
else if (process.env.NODE_ENV === "PROD") {
    rootMessage = `Server running on port ${port} in production .`;
}
app.get('/', (req, res) => {
    res.send(rootMessage);
});
app.listen(port, () => console.log(rootMessage));
