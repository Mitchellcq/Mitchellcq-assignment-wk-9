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
                //validate if number
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
            //validate if number
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
    }
    console.log('Rendering your employee page!')
    render(employees);
};

ask();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
