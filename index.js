const inquirer = require("inquirer");
const fs = require("fs");

// Defining roles
const Manager = require("./library/manager");
const Engineer = require("./library/engineer");
const Intern = require("./library/intern");
let ourTeam = [];

// create your teams's name
function askUser() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Name of your Team?",
        name: "team",
      },
    ])
    .then(function (data) {
      const team = data.team;
      ourTeam.push(team);
      addManager();
    });
}
// Define Manager
function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Manager's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Manager's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Manager's email address:",
      },
      {
        type: "number",
        name: "office",
        message: "Office number:",
      },
    ])
    // PUSH MANAGER
    .then(function (data) {
      const name = data.name;
      const id = data.id;
      const email = data.email;
      const office = data.office;
      const teammate = new Manager(name, id, email, office); // follow up on ID
      ourTeam.push(teammate);
      addMember();
    });
}
// BUILD TEAM
function addMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Add More Employees",
        choices: [
          "Add an Engineer",
          "Add an Intern",
          "No Employees to Add - Generate Page.",
        ],
        name: "addTeamData",
      },
    ])
    .then(function (data) {
      switch (data.addTeamData) {
        case "Add an Engineer":
          addEngineer();
          break;
        case "Add an Intern":
          addIntern();
          break;
        case "No Employees to Add - Generate Page.":
          buildourTeam();
          break;
      }
    });
}
// ENGINEER
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Engineer's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "Engineer's github handle:",
      },
    ])

    // Engineer push function
    .then(function (data) {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let github = data.github;
      let teammate = new Engineer(name, id, email, github);
      ourTeam.push(teammate);
      addMember();
    });
}
// Intern Prompts
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Intern's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "Intern's School:",
      },
    ])
    // Intern Push Function
    .then(function (data) {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let school = data.school;
      let teammate = new Intern(name, id, email, school);
      ourTeam.push(teammate);
      addMember();
    });
}
// Create HTML - Genration
function buildourTeam() {
  console.log("Team Generated, check dist for HTML.");
  let pageArray = [];
  let pageHead = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${ourTeam[0]} | My Department</title>
    <meta name="description" content="Learn more about the best team: ${ourTeam[0]}">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
    <div class="container-fluid">
    <div class="row">
      <div class="col-12 jumbotron mb-3 team-heading">
      <div class="header"><h1 class="text-center">${ourTeam[0]}</h1></div>
      </div>
    </div>
  </div>
      <div class="container">`;
  pageArray.push(pageHead);
  for (let i = 1; i < ourTeam.length; i++) {
    let object = `
      <div class="card">
        <div class="card-header">
        <h3>${ourTeam[i].title}</h3>
        <h4>${ourTeam[i].name}</h4>
        </div>

          <div class="card-content">
            <p><strong>EMAIL:</strong> <a href="mailto:${ourTeam[i].email}">${ourTeam[i].email}</a></p>
            <p><strong>ID:</strong> ${ourTeam[i].id}</p>`;

    // Manager
    if (ourTeam[i].office) {
      object += `<p><strong>Office: </strong> ${ourTeam[i].office}</p>`;
    }
    // Add Github for Engineer
    if (ourTeam[i].github) {
      object += `<p><strong>Github: </strong> <a href="https://github.com/${ourTeam[i].github}" target="_blank">${ourTeam[i].github}</a></p>`;
    }
    // Add School or university if Intern
    if (ourTeam[i].school) {
      object += `<p><strong>School: </strong> ${ourTeam[i].school}</p>`;
    }
    // End
    object += `</div></div>`;
    pageArray.push(object);
  }
  // Compose
  let endPage = `</div></body></html>`;
  pageArray.push(endPage);
  fs.writeFile(
    `./dist/${ourTeam[0]}.html`,
    pageArray.join(""),
    function (err) {}
  );
}
askUser();
