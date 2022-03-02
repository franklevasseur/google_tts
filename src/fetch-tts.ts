import axios from "axios";
import _ from "lodash";
import Bluebird from "bluebird";

const MAX_CHUNK_LEN = 200;

const fetchSingleChunkTTS = async (
  lang: string,
  content: string
): Promise<Buffer> => {
  try {
    console.log("Fetching for", content);
    const { data } = await axios.get(
      "https://translate.google.com/translate_tts",
      {
        responseType: "arraybuffer",
        params: {
          ie: "UTF-8",
          tl: lang,
          client: "tw-ob",
          q: content,
        },
      }
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(`HTTP call failed with ${err.response?.status}`);
    }
    throw err;
  }
};

const chunkString = (str: string, n: number): string[] =>
  _.chunk(str, n).map((c) => c.join(""));

export const fetchTTS = async (
  lang: string,
  content: string
): Promise<Buffer> => {
  const chunks = _(content.split("\n"))
    .filter((x) => !!x)
    .flatMap((line) => chunkString(line, MAX_CHUNK_LEN))
    .value();
  console.log("Chunks to fetch:", chunks.length);
  const buffers: Buffer[] = await Bluebird.map(chunks, (c) =>
    fetchSingleChunkTTS(lang, c)
  );
  return Buffer.concat(buffers);
};
