import yargs from "yargs";
import { main } from "./main";
import chalk from "chalk";

yargs
  .command(
    ["fetch <content>", "$0 <content>"],
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
    },
    (argv) => {
      void main(argv as any)
        .then(() => console.log(chalk.greenBright("Done.")))
        .catch((err) => console.log(chalk.redBright("Error:"), err));
    }
  )
  .help().argv;
