const chalk = require("chalk");
const inquirer = require("inquirer");

const guide = chalk.bold.white(`
 Bulma Breakpoints Guide (in px)

 |           TOUCH             |                DESKTOP
 0 ----------- 769 ----------- 1024 ----------- 1216 ----------- 1408 ----------->
 |   mobile    |     tablet    |      desktop   |    widescreen  |      fullhd\n\n`);

const confirmation = a => {
  console.log(
    chalk.bold.white(`
Screen Shot Settings:

- Link: ${a.baseURL}${a.page}
- Version: ${a.page} ${a.version}
- Pages: ${
      a.viewports.length ? a.viewports.join(", ") : "=== NONE SELECTED ==="
    }
`)
  );
  return "Is this correct?";
};

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
      return confirmation(answers);
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
    console.log("Answers:");
    console.log(`${answers.baseURL}${answers.page}`);
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
