const Employee = require("../lib/Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super(name, id, email);
        this.officeNum = officeNum;
    };

    getRole() {
        let role = 'Manager';
        return role;
    };

    getGithub() {
        return this.officeNum;
    };
}

module.exports = Manager;