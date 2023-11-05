"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, name, lastname, gender, password, email) {
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.gender = gender;
        this.password = password;
        this.email = email;
        this.eliminated = false;
        this.verified = false;
    }
    get getUser() { return this; }
    ;
    get getUsername() { return this.username; }
    ;
    get getName() { return this.name; }
    ;
    get getLastname() { return this.lastname; }
    ;
    get getGender() { return this.gender; }
    ;
    get getPassword() { return this.password; }
    ;
    get getEmail() { return this.email; }
    ;
    get getVerified() { return this.verified; }
    ;
    get getEliminated() { return this.eliminated; }
    ;
    updateUser(user) {
        //TODO: Connection to database anda Search in database user to update.
    }
    ;
    createUser(user) {
        //TODO: Connection to database and create new user.
    }
    searchUserById(user) {
        //TODO: Connection to database and search by id.
    }
    ;
    searchUserByUsername(username) {
        //TODO: Connection to database and search by username.
    }
    deleteUser(user) {
        //TODO: Connection to database anda Search in database user to deleted and update eliminated property.
    }
    ;
}
exports.User = User;
