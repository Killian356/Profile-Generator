const inquirer = require("inquirer");
const fs = require("fs");

// Defining roles
const Manager = require("./library/manager");
const Engineer = require("./library/engineer");
const Intern = require("./library/intern");
let myTeam = [];

// create your teams's name
function askUser() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Name of your Team?",
        name: "teamName",
      },
    ])
    .then(function (data) {
      const teamName = data.teamName;
      myTeam.push(teamName);
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
        message: "What is the Manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email address?",
      },
      {
        type: "number",
        name: "officeNum",
        message: "What is the office number?",
      },
    ])
    // PUSH MANAGER
    .then(function (data) {
      const name = data.name;
      const id = data.id;
      const email = data.email;
      const officeNum = data.officeNum;
      const teammate = new Manager(name, id, email, officeNum); // follow up on ID
      myTeam.push(teammate);
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
        choices: ["Add an Engineer", "Add an Intern", "No Employees to Add - Generate Page."],
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
          buildMyTeam();
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
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github handle?",
      },
    ])

    // PUSH ENG
    .then(function (data) {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let github = data.github;
      let teammate = new Engineer(name, id, email, github);
      myTeam.push(teammate);
      addMember();
    });
}
// INTERN
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email address?",
      },
      {
        type: "input",
        name: "school",
        message: "What school does the intern attend?",
      },
    ])
    // PURSH INTERN
    .then(function (data) {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let school = data.school;
      let teammate = new Intern(name, id, email, school);
      myTeam.push(teammate);
      addMember();
    });
}
// CREATE PAGE
function buildMyTeam() {
  console.log("Team Generated, check dist for HTML.");
  let pageArray = [];
  let pageHead = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${myTeam[0]} | My Department</title>
    <meta name="description" content="Learn more about the best team: ${myTeam[0]}">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
    <div class="container-fluid">
    <div class="row">
      <div class="col-12 jumbotron mb-3 team-heading">
      <div class="header"><h1 class="text-center">${myTeam[0]}</h1></div>
      </div>
    </div>
  </div>
      <div class="container">`;
  pageArray.push(pageHead);
  for (let i = 1; i < myTeam.length; i++) {
    let object = `
      <div class="card">
        <div class="card-header">
        <h3>${myTeam[i].title}</h3>
        <h4>${myTeam[i].name}</h4>
        </div>

          <div class="card-content">
            <p><strong>EMAIL:</strong> <a href="mailto:${myTeam[i].email}">${myTeam[i].email}</a></p>
            <p><strong>ID:</strong> ${myTeam[i].id}</p>`;
    // Add number if Manager
    if (myTeam[i].officeNum) {
      object += `<p><strong>OFFICE: </strong> ${myTeam[i].officeNum}</p>`;
    }
    // Add Github if Engineer
    if (myTeam[i].github) {
      object += `<p><strong>GITHUB: </strong> <a href="https://github.com/${myTeam[i].github}" target="_blank">${myTeam[i].github}</a></p>`;
    }
    // Add School if Intern
    if (myTeam[i].school) {
      object += `<p><strong>SCHOOL: </strong> ${myTeam[i].school}</p>`;
    }
    // End
    object += `</div></div>`;
    pageArray.push(object);
  }
  // Compose
  let endPage = `</div></body></html>`;
  pageArray.push(endPage);
  fs.writeFile(
    `./dist/${myTeam[0]}.html`,
    pageArray.join(""),
    function (err) {}
  );
}
askUser();
