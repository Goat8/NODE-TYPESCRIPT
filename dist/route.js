"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Router Home Page');
});
router.get('/about', (req, res) => {
    res.send('About Page');
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
        res.send('Login Successful');
    }
    else {
        res.status(401).send('Login Failed');
    }
});
exports.default = router;
