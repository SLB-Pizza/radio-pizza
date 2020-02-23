const chalk = require("chalk");
const puppeteer = require("puppeteer");
const devices = puppeteer.devices;

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

// // Selected Mobile
// const p2XL = puppeteer.devices["Pixel 2 XL"],;
// const iPhoneX = puppeteer.devices["iPhone X"],;
// const iPhoneXR = puppeteer.devices["iPhone XR"],;
// const mobile = [p2XL, iPhoneX, iPhoneXR];

// // Selected Tablets
// const iPad = puppeteer.devices["iPad"],;
// const iPadPro = puppeteer.devices["iPad Pro"],;
// const tablets = [iPad, iPadPro];

// All viewports
// const viewports = [...desktops, ...tablets, ...mobile];
const viewports = [
  ...desktops,
  devices["Pixel 2 XL"],
  devices["iPhone X"],
  devices["iPhone XR"],
  devices["iPad"],
  devices["iPad Pro"]
];

const dateString = () => {
  let now = new Date().toUTCString();

  let date = now.slice(5, 11);
  let time = now.slice(17, 25);

  // return now.toUTCString().slice(5, 25);
  return `${date} ${time}`;
};

(async () => {
  try {
    console.log(
      chalk.underline.bold.yellow(
        "Screenshots || Capturing the project in different viewports.\n"
      )
    );
    console.log(chalk.magenta(`  Loading Puppeteer...\n`));

    const time = await dateString();
    const browser = await puppeteer.launch();

    console.log(chalk.cyan(`  Opening new browser tab...\n`));

    const page = await browser.newPage();

    console.log(chalk.cyan(`  Navigating to localhost:8000/two-bar-layout...`));

    await page.goto("http://localhost:8000/two-bar-layout", {
      waitUntil: ["load", "domcontentloaded"]
    }); // `waitUntil: 'load'` seems required for a Gatsby site.

    console.log(chalk.cyan(`  ✅  Page loaded successfully.\n`));

    console.log(
      chalk.cyan(`  Preparing to take ${viewports.length} screenshots.\n`)
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
      await page.screenshot({
        path: `screenshots/${time} | ${currViewport.name}.png`
      });

      i !== viewports.length - 1
        ? console.log(
            chalk.green(
              `  ✅  #${i + 1} - ${currViewport.name} (${
                currViewport.viewport.width
              }x${currViewport.viewport.height}) captured.`
            )
          )
        : console.log(
            chalk.green(
              `  ✅  #${i + 1} - ${currViewport.name} (${
                currViewport.viewport.width
              }x${currViewport.viewport.height}) captured.\n`
            )
          );
    }

    console.log(
      chalk.inverse.green(
        `=== All ${viewports.length} screenshots captured successfully! ===`
      )
    );

    await browser.close();
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
