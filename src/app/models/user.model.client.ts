export class User {
    username: String;
    password: String;

    firstName: String;
    lastName: String;
    email: String;

    constructor(username, password, firstName: String = '', lastName: String = '', email: String = '') {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
