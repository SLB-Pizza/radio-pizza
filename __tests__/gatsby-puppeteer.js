const chalk = require("chalk");
const figlet = require("figlet");
const readline = require("readline");
const puppeteer = require("puppeteer");
const devices = puppeteer.devices;

let pages = [];

const customViewports = [
  {
    name: "1080p",
    comment: "a typical 1080p monitor",
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
    name: "HD Laptop",
    comment: "a typical laptop screen",
    viewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    }
  },
  {
    name: "1023 Tablet",
    comment: "tablet-view up to desktop breakpoint (1024px)",
    viewport: {
      width: 1023,
      height: 1000,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    }
  }
];

const iPad = devices["iPad"];
iPad.comment = "mobile-view up to tablet breakpoint (769px)";
const iPhoneX = devices["iPhone X"];
iPhoneX.comment = "a modern mobile device (<768px)";

const viewports = [...customViewports, iPad, iPhoneX];

/**
 * Add to viewports array for mobile and tablet
 *
 * devices["Pixel 2 XL"],
  devices["iPhone X"],
  devices["iPhone XR"],
  devices["iPad"],
  devices["iPad Pro"]
 */

// const websiteInfo = () => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.question(
//     "What is page's base URL (e.g. http://localhost:8000)\n> ",
//     answer => {
//       pages.push(answer.trim());

//       let base = answer;

//       rl.setPrompt(
//         "What are the pages you'd like to screenshot? (e.g. /two-bar-layout)\n> "
//       );
//       rl.prompt();
//     }
//   );

//   rl.on("line", input => {
//     if (input.trim() === "done") {
//       let base = pages.shift();
//       console.log(base, pages);

//       let addresses = pages.map(page => (base += page));

//       console.log(
//         "\n=======================================\nThe following pages will be screenshot:\n"
//       );

//       addresses.forEach((page, idx) => {
//         console.log(
//           "-",
//           page,
//           `${!(idx + 1 === addresses.length) ? "" : "\n"}`
//         );
//       });
//       rl.close();
//     } else {
//       pages.push(input.trim());
//       rl.setPrompt(
//         "Type `done` when done -OR- type in a route to screenshot. (e.g. /pictures)\n> "
//       );
//       rl.prompt();
//     }
//   });
// };

const dateString = () => {
  let now = new Date().toUTCString();
  let date = now.slice(5, 11);
  let time = now.slice(17, 22);

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
      chalk.white(
        figlet.textSync("Screenshots", {
          font: "Slant",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
    console.log(
      chalk.underline.white("Capturing your project in different viewports.\n")
    );
    console.log(chalk.white(`Loading Puppeteer...\n`));

    const browser = await puppeteer.launch();
    const time = await dateString();
    const webpage = "http://localhost:8000/schedule-page";

    console.log(
      chalk.white(
        `Preparing to take ${viewports.length} screenshots of ${webpage}\n`
      )
    );

    for (let i = 0; i < viewports.length; i++) {
      let currViewport = viewports[i];

      // Add userAgent string to device object for the customViewports
      if (!currViewport.hasOwnProperty("userAgent")) {
        currViewport.userAgent = await browser.userAgent();
      }

      /**
       * According to the Puppeteer docs, the order should be:
       *
       * - browser = puppeteer.launch()
       * - page = browser.newPage()
       * - await page.emulate(viewport)
       * - await page.goTo(url)
       * - finally, await browser.close()
       */

      console.log(
        chalk.cyan(`------------------------------------------------------\n`)
      );
      const page = await browser.newPage();

      console.log(
        chalk.bold.white(`  #${i + 1} - Emulating ${currViewport.name}...`)
      );
      await page.emulate(currViewport);

      console.log(chalk.white(`  ┣ Represents ${currViewport.comment}.`));
      console.log(chalk.white(`  ┃`));
      console.log(chalk.cyan(`  ┣ Opening new browser tab...`));
      console.log(chalk.cyan(`  ┣ Navigating to ${webpage}...`));
      await page.goto(`${webpage}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle2"]
      }); // `waitUntil: 'load'` seems required for a Gatsby site.

      console.log(chalk.cyan(`  ┣ ✅  Page loaded successfully.`));
      console.log(chalk.cyan(`  ┃`));

      await page.screenshot({
        path: `__tests__/screenshots/${time} | ${currViewport.name}.png`,
        fullPage: true
      });

      console.log(
        chalk.green(
          `  ┣ 🖼️   ${currViewport.name} (${currViewport.viewport.width}x${currViewport.viewport.height}) captured.`
        )
      );
      console.log(
        chalk.green(
          `  ┗ 💾  Saved to '/screenshots/${time} | ${currViewport.name}.png'\n`
        )
      );
    }

    console.log(
      chalk.inverse.green(
        `====== All ${viewports.length} screenshots captured successfully! ======`
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
