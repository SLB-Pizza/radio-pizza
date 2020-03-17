const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const deviceList = puppeteer.devices;

/**
 * Primary script variables
 * @param {string} pageRoute - the /route to capture
 * @param {string} pageVersion - version of page captured; change each revision
 * @param {string} pageURL - pulls in route and passes result to puppeteer
 */
const pageRoute = "home";
const pageVersion = "v4";
const pageURL = `http://localhost:8000/${pageRoute}`;

/**
 * Script testing variables
 * @param {boolean} takeShot - set to false when testing the script
 * @param {boolean} promptUserQuestions - gates CLI questionnaire to gather info
 */
const takeShot = true;
const promptUserQuestions = false;

/**
 * Situational variables
 * @param {boolean} fullPageCapture - set true if page is taller than window height
 * @param {boolean} clickItem - gates click script section
 * @param {string} clickTarget- the element to be clicked e.g. "div #expand-button"
 * @param {boolean} scrollToSection - gates scroll script section
 */

const fullPageCapture = false;
const clickItem = true;
const clickTarget = "div #expand-button";
const scrollToSection = false;

/************************************************
 * WARNING
 * THAR BE DRAGONS AHEAD
 ************************************************/

/**
 * CONSTANTS
 * @param {string} guide - ASCII guide of bulma breakpoints; used in user prompt
 * @param {object[]} questions - array of question objects displayed in user prompt
 * @param {object[]} customDevices - array of device objects to emulate in script
 * @param {iPad} iPad - device pulled directly from puppeteer's device library
 * @param {iPhoneX} iPhoneX - device pulled directly from puppeteer's device library
 * @param {object[]} allDevices - complete array of devices to capture screenshots of
 */
const guide = chalk.white(`
  Breakpoints Guide (in px)

  |        TOUCH SIZES         ||             DESKTOP SIZES
  0 ---------- 769 ---------- 1024 ---------- 1216 ---------- 1408 ---------->
  |   mobile    |    tablet    ||    desktop   |   widescreen  |   fullhd\n`);

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
        name: "All Sizes"
      },
      {
        name: "Touch Sizes"
      },
      {
        name: "Desktop Sizes"
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
    message(a) {
      console.log(
        chalk.white(`
  Current Settings:

  - Link: ${a.baseURL}${a.page}
  - Version: ${a.page} ${a.version}
  - Pages: ${
    a.viewports.length ? a.viewports.join(", ") : "=== NONE SELECTED ==="
  }
`)
      );
      return "Continue with these settings?";
    },
    default() {
      return true;
    }
  }
];

const customDevices = [
  {
    name: "Small Monitor",
    description: "old low-res monitors, desktop breakpoint (from 1024px)",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Widescreen",
    description: "a low-res laptop screen, widescreen breakpoint (from 1216px)",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    }
  },
  {
    name: "1080p",
    description: "a 1080p monitor, fullhd breakpoint (from 1408px)",
    viewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    }
  }
];

const iPad = deviceList["iPad"];
iPad.description = "larger mobile-view, tablet breakpoint (from 769px)";
const iPhoneX = deviceList["iPhone X"];
iPhoneX.description = "a modern mobile device, mobile breakpoint (up to 768px)";

const allDevices = [iPhoneX, iPad, ...customDevices];

/**
 * FUNCTIONS
 *
 * Running order
 * - inquirer
 * - parseViewports
 * - dateString
 */

/**
 * Returns an array of viewports to capture screenshots of
 * @function parseViewports
 * @param {string[]} choices - array of strings from the user prompt
 * @returns {array} - array of selected viewports
 */
const parseViewports = choices => {
  console.log("Choices is:\n", choices, "\n");

  let viewports = new Set();

  if (choices.indexOf("All Sizes") !== -1) {
    viewports.add(allDevices[0]);
    viewports.add(allDevices[1]);
    viewports.add(allDevices[2]);
    viewports.add(allDevices[3]);
    viewports.add(allDevices[4]);
    console.log("All", viewports.size);
  } else if (choices.indexOf("Touch Sizes") !== -1) {
    viewports.add(allDevices[0]);
    viewports.add(allDevices[1]);
    console.log("Touch", viewports.size);
  } else if (choices.indexOf("Desktop Sizes") !== -1) {
    viewports.add(allDevices[2]);
    viewports.add(allDevices[3]);
    viewports.add(allDevices[4]);
    console.log("Desktop", viewports.size);
  } else {
    for (let i = 0; i < choices.length; i++) {
      let choice = choices[i];

      switch (choice) {
        case "Mobile":
          viewports.add(allDevices[0]);
          break;
        case "Tablet":
          viewports.add(allDevices[1]);
          break;
        case "Desktop":
          viewports.add(allDevices[2]);
          break;
        case "Widescreen":
          viewports.add(allDevices[3]);
          break;
        case "FullHD":
          viewports.add(allDevices[4]);
          break;
      }
    }
    console.log("Mix and Match", viewports.size);
    return viewports;
  }
};

/**
 * Returns a formatted time and date string for use in naming files
 * @function dateString
 * @returns {string} - a filename safe formatted time-date string
 */
const dateString = () => {
  let now = Date.now();
  let time = new Date(now);
  let string = time.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York"
  });

  // Replace the comma and colon in the time expression with ""
  let regEx = new RegExp("[,:]", "gi");
  let dateStr = string.replace(regEx, "");
  return dateStr;
};

(async () => {
  try {
    console.clear();
    console.log(
      chalk.white(
        figlet.textSync("Screenshots", {
          font: "Slant",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
    console.log(chalk.white("Capturing your project in different devices.\n"));

    if (promptUserQuestions) {
      // Ask the user questions
      let answers = await inquirer.prompt(questions);

      // Kill the script if the settings were wrong
      if (answers.confirm === false) {
        process.exit();
      }

      let viewports = parseViewports(answers.viewports);
      console.log(viewports);
    }

    // Load puppeteer
    console.log(chalk.bold.white(`\n  Loading Puppeteer...`));
    const browser = await puppeteer.launch();

    console.log(
      chalk.white(
        `  Preparing to take ${allDevices.length} screenshots of ${pageURL}.\n`
      )
    );

    const time = dateString();

    let count = 0;
    for (let device of allDevices) {
      count++;

      // Add userAgent string to device object for the customDevices
      if (!device.hasOwnProperty("userAgent")) {
        device.userAgent = await browser.userAgent();
      }

      chalk.cyan(
        console.log(`------------------------------------------------------\n`)
      );
      console.log(
        chalk.bold.white(`  ${count}/${allDevices.length} - ${device.name}`)
      );
      console.log(chalk.white(`  ┣ Represents ${device.description}.`));
      console.log(chalk.white(`  ┃`));

      // Open a new browser page
      console.log(chalk.cyan(`  ┣ Opening new browser tab...`));
      const page = await browser.newPage();

      // Emulate the device
      console.log(chalk.cyan(`  ┣ Emulating ${device.name}...`));
      await page.emulate(device);

      // Navigate to the pageURL.
      console.log(chalk.cyan(`  ┣ Navigating to ${pageURL}...`));
      await page.goto(`${pageURL}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle2"]
      });
      console.log(chalk.cyan(`  ┣━ Page loaded successfully.`));

      // Click one of the time-date divs on /schedule
      if (clickItem) {
        console.log(chalk.cyan(`  ┣ Locating click target...`));
        await page.click(`${clickTarget}`);
        console.log(chalk.cyan(`  ┣━ ${clickTarget} clicked.`));
      }

      // Scroll the page to the bottom
      if (scrollToSection) {
        console.log(chalk.cyan(`  ┣ Scrolling page...`));
        await page.evaluate(() => {
          window.scrollBy(0, document.body.scrollHeight);
        });
        console.log(chalk.cyan(`  ┣━ Page scrolled to bottom.`));
      }

      // Take the screenshot
      if (takeShot) {
        console.log(
          chalk.cyan(
            `  ┣ Capturing ${
              fullPageCapture ? "full height " : ""
            }screenshot...`
          )
        );
        await page.screenshot({
          path: `__tests__/screenshots/${pageRoute} ${pageVersion} | ${device.name} | ${time}.jpeg`,
          fullPage: fullPageCapture,
          type: "jpeg",
          quality: 75
        });
      }

      // Success! Report back to the user.
      console.log(chalk.cyan(`  ┃`));
      console.log(
        chalk.green(
          `  ┣━ 🖼️   ${device.name} (${device.viewport.width}x${device.viewport.height}) captured.`
        )
      );
      console.log(
        chalk.green(
          `  ┗━ 💾  Saved to '/screenshots/${pageRoute} ${pageVersion} | ${device.name} | ${time}.jpeg'\n`
        )
      );
    }
    console.log(
      chalk.inverse.green(
        `====== All ${count} screenshots captured successfully! ======`
      )
    );

    // Wrap everything up
    await browser.close();
    process.exit();
  } catch (error) {
    // Check for errors with puppeteer errors...
    if (error instanceof puppeteer.errors.TimeoutError) {
      console.log(chalk.red(`  ┃`));
      console.log(chalk.red(`  ┗━ Operation timed out. Error logs below. \n`));
      console.log(error);
    }
    // ...then for errors displaying the questionnaire...
    else if (error.isTtyError) {
      console.log(chalk.red(`  ┃`));
      console.log(chalk.red(`  ┗━ Questionnaire couldn't be rendered.`));
      console.log(error);
    }
    // ...then for other errors.
    else {
      console.log("\n", error);
      process.exit();
    }
  }
})();
