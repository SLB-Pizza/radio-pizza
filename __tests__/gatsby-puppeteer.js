const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { URL } = require("url");
const deviceList = puppeteer.devices;

/**
 * Primary script variables, script testing variables, situational variables
 * @category Testing
 * @subcategory Puppeteer
 * @function PuppeteerTesting
 * @param {string} pageRoute - the /route to capture
 * @param {string} pageVersion - version of page captured; change each revision
 * @param {string} pageURL - pulls in route and passes result to puppeteer
 * @param {boolean} takeShot - set to false when testing the script
 * @param {boolean} fullPageCapture - set true if page is taller than window height
 * @param {boolean} promptUserQuestions - gates CLI questionnaire to gather info
 * @param {boolean} clickItem - gates click script section
 * @param {string} clickTarget- the element to be clicked e.g. "div #expand-button"
 * @param {boolean} scrollToSection - gates scroll script section
 */
const pageRoute = "";
const pageName = pageRoute === "" ? "home" : pageRoute;
const pageVersion = "v6";
const pageURL = `http://localhost:8000/${pageRoute}`;

const takeShot = true;
const fullPageCapture = false;
const auditDeploy = false;

const promptUserQuestions = false;
const clickItem = false;
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
 * @param {object[]} allDevices - complete array of devices to capture screenshots of
 */
const guide = chalk.white(`
  Breakpoints Guide (in px)

  |        TOUCH SIZES         ||             DESKTOP SIZES
  0 ---------- 768 ---------- 1024 ---------- 1216 ---------- 1408 ---------->
  |   mobile    |    tablet    ||    desktop   |   widescreen  |   fullhd\n`);

const questions = [
  {
    type: "input",
    name: "baseURL",
    message: "Base URL?",
    default() {
      return "http://localhost:8000/";
    },
  },
  {
    type: "input",
    name: "page",
    message: "Page to screenshot?",
    default() {
      return "schedule";
    },
  },
  {
    type: "input",
    name: "version",
    message: "Page version?",
    default() {
      return "v1";
    },
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
        name: "All Sizes",
      },
      {
        name: "Touch Sizes",
      },
      {
        name: "Desktop Sizes",
      },
      new inquirer.Separator("...or pick the ones you need."),
      {
        name: "Mobile",
      },
      {
        name: "Tablet",
      },
      {
        name: "Desktop",
      },
      {
        name: "Widescreen",
      },
      {
        name: "FullHD",
      },
    ],
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
    },
  },
];

const customDevices = [
  {
    name: "Desktop",
    description:
      "a narrow monitor or wide tablet, desktop (1024px <- size -> 1215px)",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    },
  },
  {
    name: "Widescreen",
    description:
      "a low-res laptop screen, widescreen (1216px <- size -> 1407px)",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    },
  },
  {
    name: "1080p",
    description: "a typical 1080p FHD monitor, fullhd (size >= 1408px)",
    viewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    },
  },
];

const iPhoneSE = deviceList["iPhone SE"];
const iPhoneX = deviceList["iPhone X"];
const p2XL = deviceList["Pixel 2 XL"];
const iPhone6 = deviceList["iPhone 6"];
const iPhone6Plus = deviceList["iPhone 6 Plus"];
const iPad = deviceList["iPad"];
const kindleFireHDX = deviceList["Kindle Fire HDX"];

iPhoneSE.description =
  "a 2012 iPhone with a tiny screen - mobile (size <= 767px)";
iPhoneX.description = "a modern iPhone - mobile (size <= 767px)";
p2XL.description = "a modern Android phone - mobile (size <= 767px)";
iPhone6.description =
  "the screen for the iPhone 6/7/8 - mobile (size <= 767px)";
iPhone6Plus.description =
  "the screen for the iPhone 6/7/8 Plus - mobile (size <= 767px)";
iPad.description = "the most common tablet - tablet (768px <- size -> 1023px)";
kindleFireHDX.description =
  "a common Android tablet - tablet (768px <- size -> 1023px)";

const allDevices = [
  iPhoneSE,
  iPhoneX,
  p2XL,
  iPhone6,
  iPhone6Plus,
  iPad,
  kindleFireHDX,
  ...customDevices,
];

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
const parseViewports = (choices) => {
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
    timeZone: "America/New_York",
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
          verticalLayout: "default",
        })
      )
    );
    console.log(chalk.white("Capturing your project in different devices.\n"));

    // Ask the user questions
    if (promptUserQuestions) {
      let answers = await inquirer.prompt(questions);

      // Kill the script if the settings were wrong
      if (answers.confirm === false) {
        process.exit();
      }

      let viewports = parseViewports(answers.viewports);
      console.log(viewports, "\n");
    }

    // Load puppeteer
    console.log(chalk.bold.white(`  Loading Puppeteer...`));
    const browser = await puppeteer.launch();

    console.log(
      chalk.white(
        `  Preparing to take ${allDevices.length} screenshots of ${pageURL}.\n`
      )
    );

    const time = dateString();
    let accessTimes = [];
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

      // Show the user whether or not script is in test mode
      if (takeShot) {
        console.log(
          chalk.bold.white(
            `  #${count} of ${allDevices.length} - ${device.name}`
          )
        );
        console.log(chalk.white(`  ┣ Represents ${device.description}.`));
        console.log(chalk.white(`  ┃`));
      } else {
        console.log(
          chalk.bold.yellow(
            `  #${count} of ${allDevices.length} - ${device.name} - TESTING: No screenshots`
          )
        );
        console.log(chalk.yellow(`  ┣ Represents ${device.description}.`));
        console.log(chalk.yellow(`  ┃`));
      }

      // Open a new browser page
      console.log(chalk.cyan(`  ┣ Opening new browser tab...`));
      const page = await browser.newPage();

      // Emulate the device
      console.log(chalk.cyan(`  ┣ Emulating ${device.name}...`));
      await page.emulate(device);

      // Navigate to the pageURL and print the load time.
      console.log(chalk.cyan(`  ┣ Navigating to ${pageURL}...`));
      let startNow = Date.now();
      await page.goto(`${pageURL}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle2"],
        timeout: 60000,
      });
      let endNow = Date.now();
      console.log(
        chalk.cyan(`  ┣ Page loaded successfully in ${endNow - startNow}ms.`)
      );
      let loadTime = endNow - startNow;

      if (clickItem || scrollToSection) {
        console.log(chalk.cyan(`  ┃`));
      }

      // Click one of the time-date divs on /schedule
      if (clickItem) {
        console.log(chalk.cyan(`  ┣ Locating click target...`));
        await page.click(`${clickTarget}`);
        console.log(chalk.cyan(`  ┣ '${clickTarget}' clicked.`));
      }

      // Scroll the page to the bottom
      if (scrollToSection) {
        console.log(chalk.cyan(`  ┣ Scrolling page...`));
        await page.evaluate(() => {
          window.scrollBy(0, document.body.scrollHeight);
        });
        console.log(chalk.cyan(`  ┣ Page scrolled.`));
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
          path: `__tests__/screenshots/${pageName} ${pageVersion} | ${device.name} | ${time}.jpeg`,
          fullPage: fullPageCapture,
          type: "jpeg",
          quality: 75,
        });
      }

      accessTimes.push(loadTime);
      if (!takeShot) {
        console.log(chalk.yellow(`  ┣ Value pushed: ${loadTime}`));
        console.log(chalk.yellow(`  ┣ accessTimes: ${accessTimes}`));
      }
      // Success! Report back to the user.
      console.log(chalk.cyan(`  ┃`));
      console.log(
        chalk.green(
          `  ┣ 🖼️   ${device.name} (${device.viewport.width}x${device.viewport.height}) captured.`
        )
      );
      console.log(
        chalk.green(
          `  ┗ 💾  Saved to '/screenshots/${pageName} ${pageVersion} | ${device.name} | ${time}.jpeg'\n`
        )
      );

      // Close the current page - don't let them buildup or it'll slow down and timeout.
      await page.close();
    }

    // Calculate metrics
    const avgTime = (times) => times.reduce((a, b) => a + b, 0) / times.length;

    // Summarize screenshot total
    console.log(
      chalk.inverse.green(
        `====== ${count} screenshots taken successfully! ======\n`
      )
    );
    console.log(chalk.green(`  Results`));
    console.log(chalk.green(`  ┃`));
    console.log(
      chalk.green(`  ┣ Average page load: ${avgTime(accessTimes)}ms.`)
    );
    console.log(
      chalk.green(`  ┣ Fastest page load: ${Math.min(...accessTimes)}ms.`)
    );
    console.log(
      chalk.green(`  ┣ Slowest page load: ${Math.max(...accessTimes)}ms.`)
    );

    if (auditDeploy) {
      console.log(
        chalk.white(
          figlet.textSync("Lighthouse", {
            font: "Slant",
            horizontalLayout: "default",
            verticalLayout: "default",
          })
        )
      );
      const url = `https://halfmoon-rebuild-wip-2020.netlify.com/`;
      console.log(chalk.white(`\nAuditing ${url} with Lighthouse.\n`));

      // Lighthouse will open URL. Puppeteer observes `targetchanged` and sets up network conditions.
      // Possible race condition.
      const { lhr } = await lighthouse(url, {
        port: new URL(browser.wsEndpoint()).port,
        output: "json",
        logLevel: "info",
      });

      const auditCategories = ["Performance", ""];

      console.log(
        chalk.white(
          `\nLighthouse Audit Results:\n${Object.values(lhr.categories)
            .map((c) => `${c.title} -- ${Math.floor(c.score * 100)}/100`)
            .join("\n")}`
        )
      );
    }

    // Wrap everything up
    await browser.close();
    process.exit();
  } catch (error) {
    // Check for errors with puppeteer errors...
    if (error instanceof puppeteer.errors.TimeoutError) {
      console.log(chalk.red(`  ┃`));
      console.log(chalk.red(`  ┣ Operation timed out.`));
      console.log(
        chalk.red(
          `  ┣ Try changing/removing 'waitUntil' conditions for 'page.goTo()'.`,
          `  ┣ Are you opening too many pages at once without closing them?`
        )
      );
      console.log(chalk.red(`  ┗ Error logs below. `));
      console.log("\n", error);
      process.exit();
    }
    // ...then for errors displaying the questionnaire...
    else if (error.isTtyError) {
      console.log(chalk.red(`  ┃`));
      console.log(chalk.red(`  ┗ Questionnaire couldn't be rendered.`));
      console.log("\n", error);
      process.exit();
    }
    // ...then for other errors.
    else {
      console.log(chalk.red(`  ┃`));
      console.log(chalk.red(`  ┗ Something went wrong. Error logs below.`));
      console.log("\n", error);
      process.exit();
    }
  }
})();
