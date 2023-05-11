import fs from "fs";
import path from "path";

/**
  Find the nearest ancestor directory of `dir` that contains the specified
  `rootFile`.

  e.g., `findRoot('package.json', __dirname)` will find the ancestor directory
  of the current source file that contains a `package.json` file.
*/
export function findRoot(
  rootFile: string,
  dir: string,
  startingDir: string = dir
): string {
  if (fs.existsSync(path.join(dir, rootFile))) {
    return dir;
  }

  if (dir === "/") {
    throw new Error(
      `Could not find root file "${rootFile}" in any parent directory of "${startingDir}"`
    );
  }

  return findRoot(rootFile, path.dirname(dir), startingDir);
}
