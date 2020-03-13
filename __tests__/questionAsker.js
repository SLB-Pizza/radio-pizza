const chalk = require("chalk");
const inquirer = require("inquirer");

const guide = chalk.bold(`
 Bulma Breakpoints Guide (in px)

 |           TOUCH             |                DESKTOP
 0 ----------- 769 ----------- 1024 ----------- 1216 ----------- 1408 ----------->
 |   mobile    |     tablet    |      desktop   |    widescreen  |      fullhd\n\n`);

const questions = [
  {
    type: "input",
    name: "baseURL",
    message: "Base URL?",
    default() {
      return "http://localhost:8000/";
    }
  },
  {
    type: "input",
    name: "page",
    message: "Page to screenshot?",
    default() {
      return "schedule";
    }
  },
  {
    type: "input",
    name: "version",
    message: "Page version?",
    default() {
      return "v1";
    }
  },
  {
    type: "checkbox",
    message() {
      console.log(guide);
      return "Which viewports to screenshot?";
    },
    name: "viewports",
    pageSize: 21,
    choices: [
      new inquirer.Separator("Select a viewport group..."),
      {
        name: "All"
      },
      {
        name: "Touch"
      },
      {
        name: "Desktop"
      },
      new inquirer.Separator("...or pick the ones you need."),
      {
        name: "Mobile"
      },
      {
        name: "Tablet"
      },
      {
        name: "Desktop"
      },
      {
        name: "Widescreen"
      },
      {
        name: "FullHD"
      }
    ]
  },
  {
    type: "confirm",
    name: "confirm",
    message(answers) {
      console.log(`
  Entered info

  - Link: ${answers.baseURL}${answers.page}
  - Version: ${answers.page}${answers.version}
  `);
      return "Is this correct?";
    },
    default() {
      return false;
    }
  }
];

// Execute questionnaire
(async () => {
  try {
    let answers = await inquirer.prompt(questions);
    let answersObj = JSON.stringify(answers, null, " ");
    console.log("Answers:");
    console.log(answersObj);
    console.log(
      `${answersObj.page}${answersObj.version} | ${answersObj.baseRoute}${answersObj.page}\n${answersObj.viewports}`
    );
  } catch (error) {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered.");
      console.log(error);
    } else {
      console.log("Something else went wrong.");
      console.log(error);
    }
  }
})();
