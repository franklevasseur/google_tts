import { fetchTTS } from "./fetch-tts";
import fs from "fs/promises";

type Argv = {
  lang: string;
  output: string;
  content: string;
};

export const main = async (argv: Argv) => {
  const mp3Bin = await fetchTTS(argv.lang, argv.content as string);
  await fs.writeFile(argv.output, mp3Bin);
};
