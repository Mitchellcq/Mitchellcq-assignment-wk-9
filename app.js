const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//email validator module
const validator = require("email-validator");
//validator.validate(a@a.com); ==true

var employees = [];

function ask() {
    inquirer.prompt({
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add a new team member?",
    }).then(answer => {
        console.log(answer);
        if (answer.addEmployee == true) {
            console.log('creating new employee!');
            newEmployee();
        } else {
            renderNewEmployees();
        }
    }).catch(error => {
        console.log(error);
    })
};

function newEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is your name?",
            name: 'name',
            default: 'Mitchell',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter a valid name");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "What is your email address?",
            name: 'email',
            default: 'blank@nowhere.net',
            validate: function (answer) {
                if (validator.validate(answer) !== true) {
                    return console.log("A valid GitHub repo is required for a badge.");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "Please select an ID number",
            name: 'id',
            default: '1',
            validate: function (answer) {
                //need to validate if already selected this number
                if (isNaN(answer)) {
                    return console.log("Please enter a valid ID number");
                }
                return true;
            }
        },
        {
            type: 'list',
            message: "Please select a role.",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'role'
        },
        {
            when: input => {
                return input.role == "Intern"
            },
            type: 'input',
            message: "What school do you attend?",
            name: 'school',
            default: 'USYD',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter a valid school");
                }
                return true;
            }
        },
        {
            when: input => {
                return input.role == "Engineer"
            },
            type: 'input',
            message: "What is your Github username?",
            name: 'github',
            default: 'Mitchellcq',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter a valid Username");
                }
                return true;;
            }
        },
        {
            when: input => {
                return input.role == "Manager"
            },
            type: 'input',
            message: "What is your Office Number?",
            name: 'officeNum',
            default: '1',
            //need to validate if already selected this number
            validate: function (answer) {
                if (isNaN(answer)) {
                    return console.log("Please enter a valid ID number");
                }
                return true;
            }
        },
    ]).then(
        (answers) => {
            if (answers.role == 'Manager') {
                var newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNum);
            } else if (answers.role == 'Engineer') {
                var newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github);
            } else {
                var newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school);
            };

            employees.push(newEmployee);
            console.log(employees);

            ask();

        }).catch(error => {
            console.log(error);
        });
};

function renderNewEmployees() {
    if (employees.length === 0) {
        console.log('Please add at least one employee!');
        ask();
    } else {
        console.log('Rendering your employee page!');

        buildHtmlPage();
    }
};

function buildHtmlPage() {
    let newFile = render(employees);
    fs.writeFileSync("./output/teamPage.html", newFile, function (err) {
        if (err) throw err;
    })

    console.log("Base page generated!");
};


ask();

