"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    const { userId } = req.cookies;
    if (!userId) {
        return res.status(401).json({
            error: 'Access denied. Please log in to manage your lab notbook.',
        });
    }
    next();
};
exports.isAuth = isAuth;
