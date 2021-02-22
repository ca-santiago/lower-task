import { saveFile } from "./types";
import fs from "fs";
import path from "path";

export type LocalFileSaverService = (basePath: string) => saveFile;

const makeLocalFileSaver: LocalFileSaverService = (basePath): saveFile => {
  return async (data, fileName) => {
    fs.writeFileSync(path.join(basePath, fileName), data);
    return fileName;
  };
};

export { makeLocalFileSaver };
