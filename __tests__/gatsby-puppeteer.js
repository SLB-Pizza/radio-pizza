const chalk = require("chalk");
const readline = require("readline");
const puppeteer = require("puppeteer");
const devices = puppeteer.devices;

let pages = [];

const desktops = [
  {
    name: "Landscape 1080p",
    viewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    }
  },
  {
    name: "Portrait 1080p",
    viewport: {
      width: 1080,
      height: 1920,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    }
  }
];

const viewports = [
  ...desktops,
  devices["Pixel 2 XL"],
  devices["iPhone X"],
  devices["iPhone XR"],
  devices["iPad"],
  devices["iPad Pro"]
];

/**
 * Add to viewports array for mobile and tablet
 *
 * devices["Pixel 2 XL"],
  devices["iPhone X"],
  devices["iPhone XR"],
  devices["iPad"],
  devices["iPad Pro"]
 */

const websiteInfo = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    "What is page's base URL (e.g. http://localhost:8000)\n> ",
    answer => {
      pages.push(answer.trim());

      let base = answer;

      rl.setPrompt(
        "What are the pages you'd like to screenshot? (e.g. /two-bar-layout)\n> "
      );
      rl.prompt();
    }
  );

  rl.on("line", input => {
    if (input.trim() === "done") {
      let base = pages.shift();
      console.log(base, pages);

      let addresses = pages.map(page => (base += page));

      console.log(
        "\n=======================================\nThe following pages will be screenshot:\n"
      );

      addresses.forEach((page, idx) => {
        console.log(
          "-",
          page,
          `${!(idx + 1 === addresses.length) ? "" : "\n"}`
        );
      });
      rl.close();
    } else {
      pages.push(input.trim());
      rl.setPrompt(
        "Type `done` when done -OR- type in a route to screenshot. (e.g. /pictures)\n> "
      );
      rl.prompt();
    }
  });
};

const dateString = () => {
  let now = new Date().toUTCString();
  let date = now.slice(5, 11);
  let time = now.slice(17, 25);

  return `${date} ${time}`;
};

(async () => {
  try {
    /**
     * WebsiteInfo function not working; not essential
     *
     * await websiteInfo();
     */
    console.clear();
    console.log(
      chalk.underline.bold.yellow(
        "Screenshots || Capturing the project in different viewports.\n"
      )
    );

    console.log(chalk.magenta(`  Loading Puppeteer...\n`));

    const browser = await puppeteer.launch();
    const time = await dateString();

    console.log(chalk.cyan(`  Opening new browser tab...\n`));

    const page = await browser.newPage();

    console.log(chalk.cyan(`  Navigating to localhost:8000/two-bar-layout...`));

    await page.goto("http://localhost:8000/about-page", {
      waitUntil: ["load", "domcontentloaded"]
    }); // `waitUntil: 'load'` seems required for a Gatsby site.

    console.log(
      chalk.cyan(
        `  ✅  Page loaded successfully.\n\n  Preparing to take ${viewports.length} screenshots.\n  ➡️   Screenshots will be saved in '__tests__/screenshots'\n`
      )
    );

    for (let i = 0; i < viewports.length; i++) {
      let currViewport = viewports[i];

      // Add userAgent string to device object for the desktops
      if (!currViewport.hasOwnProperty("userAgent")) {
        currViewport.userAgent = await browser.userAgent();
      }

      // Emulate the current device
      await page.emulate(currViewport);

      // Take a screenshot 500ms after device emulation is complete
      // setTimeout(() => , 500);
      console.log(chalk.green(`  Emulating ${currViewport.name}...`));

      await page.screenshot({
        path: `__tests__/screenshots/${time} | ${currViewport.name}.png`
      });

      console.log(
        chalk.green(
          `  ✅  #${i + 1} - ${currViewport.name} (${
            currViewport.viewport.width
          }x${currViewport.viewport.height}) captured.\n`
        )
      );

      await page.reload({ waitUntil: ["load", "domcontentloaded"] });
    }

    console.log(
      chalk.inverse.green(
        `=== All ${viewports.length} screenshots captured successfully! ===`
      )
    );

    await browser.close();
    process.exit();
  } catch (error) {
    console.log(
      chalk.inverse.bold.red(
        `\n  Something went wrong. Is the server running?  \n`
      )
    );
    if (error instanceof puppeteer.errors.TimeoutError) {
      console.log(
        chalk.inverse.bold.red(`Operation timed out. Error logs below. \n`)
      );
      console.log(error);
    } else {
      console.log(error);
    }
    await browser.close();
  }
})();
