"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const experiment_routes_1 = __importDefault(require("./routes/experiment.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:4321'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/experiments', experiment_routes_1.default);
app.use('/experiments/:experimentId/subject', subject_routes_1.default);
app.use('/', page_routes_1.default);
app.use((req, res) => {
    res.status(404).send('Invalid route.');
});
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error('Missing port!');
}
app.listen(PORT, () => {
    console.log(`Server is runing on http://localhost:${PORT} `);
});
