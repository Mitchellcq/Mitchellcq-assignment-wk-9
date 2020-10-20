const Employee = require("../lib/Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    };

    getRole() {
        let role = 'Intern';
        return role;
    };

    getGithub() {
        return this.school;
    };
}

module.exports = Intern;