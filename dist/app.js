"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_decorator_1 = require("./decorators/controller.decorator");
require("./controllers/sku.controller");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(controller_decorator_1.router); // use the router for routes starting with '/app'
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
