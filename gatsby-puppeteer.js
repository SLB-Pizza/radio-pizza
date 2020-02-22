const chalk = require("chalk");
const puppeteer = require("puppeteer");

const viewports = [
  { viewportName: "Widescreen 1080p", width: 1920, height: 1080 },
  { viewportName: "iPad", width: 768, height: 1024 }
];

const dateString = () => {
  let now = new Date();

  // let currMonth = now.getMonth() + 1;
  // let currDate = now.getDate();
  // let currHour = now.getHours();
  // let currMin = now.getMinutes();
  // let currSec = now.getSeconds();

  // return `[0${currMonth}-${currDate} -- ${currHour}.${currMin}.${currSec}]`;

  return now.toUTCString().slice(5, 25);
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

    const browser = await puppeteer.launch(); // Here a bunch of options can be set like `headless` and `executablePath`

    console.log(chalk.cyan(`  Opening new browser tab...\n`));

    const page = await browser.newPage();

    console.log(chalk.cyan(`  Navigating to localhost:8000/two-bar-layout...`));

    await page.goto("http://localhost:8000/two-bar-layout", {
      waitUntil: "load"
    }); // `waitUntil: 'load'` seems required for a Gatsby site.

    console.log(chalk.cyan(`  ✅  Page loaded successfully.\n`));

    console.log(
      chalk.cyan(`  Preparing to take ${viewports.length} screenshots.\n`)
    );

    for (let i = 0; i < viewports.length; i++) {
      let currViewport = viewports[i];
      // We can emulate screen dimension
      await page.setViewport({
        width: currViewport.width,
        height: currViewport.height
      });
      // ... and device type
      await page.emulateMedia("screen");

      // Take a screenshot
      await page.screenshot({
        path: `screenshots/${time} -- ${currViewport.viewportName}.png`
      });

      i !== viewports.length - 1
        ? console.log(
            chalk.green(
              `  ✅  #${i + 1} - ${currViewport.viewportName} (${
                currViewport.width
              }x${currViewport.height}) captured.`
            )
          )
        : console.log(
            chalk.green(
              `  ✅  #${i + 1} - ${currViewport.viewportName} (${
                currViewport.width
              }x${currViewport.height}) captured.\n`
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
    console.log(error);
  }
})();
