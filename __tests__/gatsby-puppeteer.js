const chalk = require("chalk");
const figlet = require("figlet");
const puppeteer = require("puppeteer");
const deviceList = puppeteer.devices;

/**
 * Edit these to change the webpage.
 *
 * webpage version is used to name the file
 * PLEASE REMEMBER TO UPDATE IT
 *
 */
const webpageName = "schedule";
const webpageVersion = "v1";
const webpage = `http://localhost:8000/${webpageName}`;

/**
 * WARNING
 *
 * THERE BE DRAGONS AHEAD
 */

const customDevices = [
  {
    name: "1080p",
    description: "a 1080p monitor, fullhd breakpoint (>1408px)",
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
    name: "Laptop",
    description: "a low-res laptop screen, widescreen breakpoint (<1407px)",
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
    name: "Tablet",
    description: "tablet-view up to desktop breakpoint (<1024px)",
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

const iPad = deviceList["iPad"];
iPad.description = "larger mobile-view up to tablet breakpoint (<769px)";
const iPhoneX = deviceList["iPhone X"];
iPhoneX.description = "a modern mobile device (<768px)";

const devices = [...customDevices, iPad, iPhoneX];

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
      chalk.underline.white("Capturing your project in different devices.\n")
    );
    console.log(chalk.white(`Loading Puppeteer...\n`));

    const browser = await puppeteer.launch();
    const time = dateString();

    console.log(
      chalk.white(
        `Preparing to take ${devices.length} screenshots of ${webpage}\n`
      )
    );

    for (let i = 0; i < devices.length; i++) {
      let device = devices[i];

      // Add userAgent string to device object for the customDevices
      if (!device.hasOwnProperty("userAgent")) {
        device.userAgent = await browser.userAgent();
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

      // Open a new browser page
      const page = await browser.newPage();

      console.log(
        chalk.bold.white(`  #${i + 1} - Emulating ${device.name}...`)
      );

      // Emulate the device
      await page.emulate(device);

      console.log(chalk.white(`  ┣ Represents ${device.description}.`));
      console.log(chalk.white(`  ┃`));
      console.log(chalk.cyan(`  ┣ Opening new browser tab...`));
      console.log(chalk.cyan(`  ┣ Navigating to ${webpage}...`));

      // Navigate to the webpage.
      await page.goto(`${webpage}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle2"]
      });

      // Click one of the time-date divs
      await page.click("div #test-active");

      console.log(chalk.cyan(`  ┣ ✅  Page loaded successfully.`));
      console.log(chalk.cyan(`  ┃`));

      // Take the screenshot
      // await page.screenshot({
      //   path: `__tests__/screenshots/${webpageName} ${webpageVersion} | ${device.name} | ${time}.png`
      // });

      console.log(
        chalk.green(
          `  ┣ 🖼️   ${device.name} (${device.viewport.width}x${device.viewport.height}) captured.`
        )
      );
      console.log(
        chalk.green(
          `  ┗ 💾  Saved to '/screenshots/${webpageName} ${webpageVersion} | ${device.name} | ${time}.png'\n`
        )
      );
    }

    console.log(
      chalk.inverse.green(
        `====== All ${devices.length} screenshots captured successfully! ======`
      )
    );

    await browser.close();
    process.exit();
  } catch (error) {
    // Error catching
    console.log(chalk.red(`  ┃`));
    console.log(chalk.inverse.bold.red(`  ┣ ❌  Something went wrong. `));
    console.log(chalk.red(`  ┃`));
    console.log(chalk.red("  ┣ ====== Common Issues ======"));
    console.log(chalk.red("  ┣━ Is the dev server running?"));
    console.log(chalk.red("  ┗━ Is the URL correct? ➡", webpage, "\n"));
    if (error instanceof puppeteer.errors.TimeoutError) {
      console.log(
        chalk.inverse.bold.red(`Operation timed out. Error logs below. \n`)
      );
      console.log(error);
    } else {
      console.log(error);
      process.exit();
    }
  }
})();
