import yargs from "yargs";
import { main } from "./main";
import chalk from "chalk";

yargs
  .command(
    ["fetch", "$0"],
    "Fetches TTS mp3 file",
    {
      lang: {
        type: "string",
        alias: "l",
        required: true,
      },
      output: {
        type: "string",
        alias: "o",
        required: true,
      },
      content: {
        type: "string",
        alias: "c",
      },
      input: {
        type: "string",
        alias: "i",
      },
    },
    (argv) => {
      void main(argv)
        .then(() => console.log(chalk.greenBright("Done.")))
        .catch((err) => console.log(chalk.redBright("Error:"), err));
    }
  )
  .help().argv;
