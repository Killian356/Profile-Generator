const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./Manager.js");
const Engineer = require("./Engineer.js");
const Intern = require("./Intern.js");

function Generate() {
  this.manager;
  this.engineer = [];
  this.intern = [];
}
Generate.prototype.promptManager = function () {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "To start, please enter the manager's name:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(`You must enter a name!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Employee ID:",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log(`You must enter an ID!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Email:",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log(`You must enter an email!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Office Number:",
        validate: (officeNumberInput) => {
          if (officeNumberInput) {
            return true;
          } else {
            console.log("You must enter the office number!");
            return false;
          }
        },
      },
    ])
    .then(({ name, id, email, officeNumber }) => {
      console.log(name, id, email, officeNumber);
      this.manager = new Manager(name, id, email, officeNumber);
      console.log(this.manager);
      this.initMainMenu();
    });
};

Generate.prototype.initMainMenu = function () {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "Add Engineer",
          "Add Intern",
          "No more employees - Generate my page!",
        ],
      },
    ])
    .then(({ menu }) => {
      if (menu === "Add Engineer") {
        this.promptEngineer();
      }
      if (menu === "Add Intern") {
        this.promptIntern();
      }
      if (menu === "No more employees - Generate my page!") {
        console.log(this.manager);
        console.log(this.engineer);
        console.log(this.intern);
        this.generateHTML();
      }
    });
};

Generate.prototype.promptEngineer = function () {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer name:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(`You must enter a name!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Employee ID:",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log(`You must enter an ID!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Email:",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log(`You must enter an email!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "GitHub Username:",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("You must enter a GitHub username!");
            return false;
          }
        },
      },
    ])
    .then(({ name, id, email, github }) => {
      this.engineer.push(new Engineer(name, id, email, github));
      this.initMainMenu();
    });
};

Generate.prototype.promptIntern = function () {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(`You must enter a name!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Employee ID:",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log(`You must enter an ID!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Email:",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log(`You must enter an email!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Name of School:",
        validate: (officeNumberInput) => {
          if (officeNumberInput) {
            return true;
          } else {
            console.log("You must enter a school name!");
            return false;
          }
        },
      },
    ])
    .then(({ name, id, email, school }) => {
      this.intern.push(new Intern(name, id, email, school));
      this.initMainMenu();
    });
};

Generate.prototype.generateHTML = function () {
  fs.writeFile(
    "./dist/index.html",
    `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
         />
         <link rel="stylesheet" href="style.css" />
    <script src="https://kit.fontawesome.com/c502137733.js"></script>

        <link rel="stylesheet" href="style.css">

        <meta name='viewport' content='width=device-width, initial-scale=1'>
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

<meta name='viewport' content='width=device-width, initial-scale=1'>
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    </head>
    <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 jumbotron mb-3 team-heading">
          <h1 class="text-center">My Team</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
      </div>
    </div>
        
    <main>
    ${this.generateManager()}
    ${this.generateEngineer()}
    ${this.generateIntern()}
    </main>

</body>
</html>
`,
    "utf8",
    (err) => {
      if (err) {
        throw err;
      }
      console.log("File created!");
    }
  );
};

Generate.prototype.generateManager = function () {
  return `
    
    <div class="card">
    <div class="card-header">
        <h2 class="card-title">${this.manager.getName()}</h2>
        <h3 class="card-title"><i class='fas fa-mug-hot' style='font-size:24px'></i>${this.manager.getRole()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">ID: ${this.manager.getId()}</li>
          <li class="list-group-item">
        Email: <a class="link" target = _blank href="mailto:${this.manager.getEmail()}">${this.manager.getEmail()}</a>
        </li>
        <li class="list-group-item"> Office Number: ${this.manager.getOfficeNumber()}</li>
        </ul>
    </div>
    </div>
    `;
};

Generate.prototype.generateEngineer = function () {
  return `
            ${this.engineer.map((eng) => {
              return `
                    <div class="card">
                    <div class="card-header">
                    <h2 class="card-title">${eng.getName()}</h2>
                    <h3 class="card-title"><i class='fas fa-glasses' style='font-size:24px'></i>${eng.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item">ID:${eng.getId()}</li>
                      <li class="list-group-item">
                    Email: <a class="link" target = _blank href="mailto:${eng.getEmail()}">${eng.getEmail()}</a>
                    </li>
                    <li class="list-group-item">
                    GitHub: <a class="link" target = _blank href="https://github.com/${eng.getGithub()}">${eng.getGithub()}</a>
                    </li>
                    </ul>
                </div>
                    </div>
                    
                `;
            })}
        `;
};

Generate.prototype.generateIntern = function () {
  return `
        ${this.intern.map((int) => {
          return `
                <div class="card">
    
                <div class="card-header">
                <h2 class="card-title">${int.getName()}</h2>
                <h3 class="card-title"><i class='fas fa-user-graduate' style='font-size:24px'></i>${int.getRole()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">ID:${int.getId()}</li>
                  <li class="list-group-item">
                Email: <a class="link" target = _blank href="mailto:${int.getEmail()}">${int.getEmail()}</a>
                </li>
                <li class="list-group-item">School:${int.getSchool()}</li>
                </li>
                </ul>
            </div>
                </div>
            `;
        })}
    `;
};

module.exports = Generate;
