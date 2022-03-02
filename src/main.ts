import { fetchTTS } from "./fetch-tts";
import fs from "fs/promises";

type Argv = {
  lang: string;
  output: string;
  content?: string;
  input?: string;
};

export const main = async (argv: Argv) => {
  let input: string;
  if (argv.input) {
    input = await fs.readFile(argv.input, "utf8");
  } else if (argv.content) {
    input = argv.content;
  } else {
    throw new Error("Program accepts either content or input file");
  }
  const mp3Bin = await fetchTTS(argv.lang, input);
  await fs.writeFile(argv.output, mp3Bin);
};
