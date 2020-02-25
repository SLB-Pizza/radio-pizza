const readline = require("readline");

let pages = [];

const setup = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    "What is page's base URL (e.g. http://localhost:8000)\n> ",
    answer => {
      pages.push(answer.trim());

      rl.setPrompt(
        "What are the pages you'd like to screenshot? (e.g. /two-bar-layout)\n> "
      );
      rl.prompt();
    }
  );

  rl.on("line", input => {
    if (input.trim() === "done") {
      let base = pages.shift();

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

setup();
