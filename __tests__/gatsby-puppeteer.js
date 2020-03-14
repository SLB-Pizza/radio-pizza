const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const deviceList = puppeteer.devices;

/**
 * Edit each time before using script!
 */
const webpageRoute = "home";
const webpageVersion = "v3";
const webpage = `http://localhost:8000/${webpageRoute}`;

// Set false to test script
const takeScreenshot = false;

// Situational for pages
const clickItem = false;
const scroll = true;

/************************************************
 * WARNING
 * THERE BE DRAGONS AHEAD
 ************************************************/

/************************************************
 * CONSTANTS
 ************************************************/

// Breakpoint guide to display in questionnaire
const guide = chalk.white(`
  Breakpoints Guide (in px)

  |        TOUCH SIZES         ||             DESKTOP SIZES
  0 ---------- 769 ---------- 1024 ---------- 1216 ---------- 1408 ---------->
  |   mobile    |    tablet    ||    desktop   |   widescreen  |   fullhd\n`);

// Questions to ask the user
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

// Define custom devices
const customDevices = [
  {
    name: "iPad Horiz",
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

// Define mobile viewports and set descriptions
const iPad = deviceList["iPad"];
iPad.description = "larger mobile-view, tablet breakpoint (from 769px)";
const iPhoneX = deviceList["iPhone X"];
iPhoneX.description = "a modern mobile device, mobile breakpoint (up to 768px)";

// Collect all devices
const allDevices = [iPhoneX, iPad, ...customDevices];

/************************************************
 * FUNCTIONS
 *
 * Running order
 * - inquirer
 * - parseViewports
 * - dateString
 ************************************************/

// Pick out the viewports the user wants
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

// Get date and time
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

    // Ask the user questions
    // let answers = await inquirer.prompt(questions);

    // End the program if the settings were wrong
    // if (answers.confirm === false) {
    //   process.exit();
    // }

    // Parse user viewports
    // let viewports = parseViewports(answers.viewports);
    // console.log(viewports);

    // Load puppeteer
    console.log(chalk.bold.white(`\n  Loading Puppeteer...`));
    const browser = await puppeteer.launch();

    console.log(
      chalk.white(
        `  Preparing to take ${allDevices.length} screenshots of ${webpage}\n`
      )
    );

    // Get the current time
    const time = dateString();

    // Iterate over the selected viewports
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

      // Open a new browser page
      const page = await browser.newPage();

      console.log(
        chalk.bold.white(`  #${count} - Emulating ${device.name}...`)
      );
      console.log(chalk.white(`  ┣ Represents ${device.description}.`));

      // Emulate the device
      await page.emulate(device);
      console.log(chalk.white(`  ┃`));
      console.log(chalk.cyan(`  ┣ Opening new browser tab...`));

      // Navigate to the webpage.
      console.log(chalk.cyan(`  ┣ Navigating to ${webpage}...`));
      await page.goto(`${webpage}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle2"]
      });
      console.log(chalk.cyan(`  ┣━ Page loaded successfully.`));

      if (clickItem) {
        // Click one of the time-date divs on /schedule
        console.log(chalk.cyan(`  ┣ Locating click target...`));
        await page.click("div #test-active");
        console.log(chalk.cyan(`  ┣━ '#test-active' clicked.`));
      }

      // Scroll the page to the bottom
      if (scroll) {
        console.log(chalk.cyan(`  ┣ Scrolling page...`));
        await page.evaluate(() => {
          window.scrollBy(0, document.body.scrollHeight);
        });
        console.log(chalk.cyan(`  ┣━ Page scrolled to bottom.`));
      }

      // Take the screenshot
      if (takeScreenshot) {
        await page.screenshot({
          path: `__tests__/screenshots/${webpageRoute} ${webpageVersion} | ${device.name} | ${time}.png`
        });
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
          `  ┗ 💾  Saved to '/screenshots/${webpageRoute} ${webpageVersion} | ${device.name} | ${time}.png'\n`
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

// let count = 1;
// for (let device of viewports) {
//   // Add userAgent string to device object for the customDevices
//   if (!device.hasOwnProperty("userAgent")) {
//     device.userAgent = await browser.userAgent();
//   }

//   chalk.cyan(
//     console.log(`------------------------------------------------------\n`)
//   );

//   // Open a new browser page
//   const page = await browser.newPage();

//   console.log(
//     chalk.bold.white(`  #${count} - Emulating ${device.name}...`)
//   );

//   // Emulate the device
//   await page.emulate(device);

//   console.log(chalk.white(`  ┣ Represents ${device.description}.`));
//   console.log(chalk.white(`  ┃`));
//   console.log(chalk.cyan(`  ┣ Opening new browser tab...`));
//   console.log(chalk.cyan(`  ┣ Navigating to ${webpage}...`));

//   // Navigate to the webpage.
//   await page.goto(`${webpage}`, {
//     waitUntil: ["load", "domcontentloaded", "networkidle2"]
//   });

//   // Click one of the time-date divs
//   // await page.click("div #test-active");

//   console.log(chalk.cyan(`  ┣ ✅  Page loaded successfully.`));
//   console.log(chalk.cyan(`  ┃`));

//   // Take the screenshot
//   // await page.screenshot({
//   //   path: `__tests__/screenshots/${webpageRoute} ${webpageVersion} | ${device.name} | ${time}.png`
//   // });

//   // Success! Report back to the user.
//   console.log(
//     chalk.green(
//       `  ┣ 🖼️   ${device.name} (${device.viewport.width}x${device.viewport.height}) captured.`
//     )
//   );
//   console.log(
//     chalk.green(
//       `  ┗ 💾  Saved to '/screenshots/${webpageRoute} ${webpageVersion} | ${device.name} | ${time}.png'\n`
//     )
//   );
//   // Increase the count
//   count++;
// }
