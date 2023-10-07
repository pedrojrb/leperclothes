"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    getUsers(req, res) {
        res.status(200).json({
            "message": "User 1"
        });
    }
}
exports.User = User;
