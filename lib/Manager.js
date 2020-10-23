const Employee = require("../lib/Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };

    getRole() {
        let role = 'Manager';
        return role;
    };

    getOfficeNumber() {
        return this.officeNumber;
    };
}

module.exports = Manager;