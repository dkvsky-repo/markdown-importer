import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Get full path.
 *
 * @param {string} targetDirectory: A path to a given target directory in
 *  root dir, i.e; 'markdown/resume-data', 'markdown/resume-data/projects'.
 */
function getFullPathTo(targetDirectory) {
  return path.join(process.cwd(), `${targetDirectory}`);
}

function processFile(dir, fileName) {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return {
    fileName,
    id,
    metadata: matterResult.data,
    content: matterResult.content,
  };
}

/**
 * Get data from .md files.
 *
 * @param {string} targetDirectory: Name of directory where content lives, i.e; 'markdown',
 *  'markdown/pages', 'markdown/posts', etc.
 */
function getData(targetDirectory) {
  let dir = getFullPathTo(targetDirectory);

  const fileNames = fs.readdirSync(dir).filter((name) => name.match(/\.md$/));

  return fileNames.length === 1
    ? processFile(dir, fileNames[0])
    : fileNames.map((fileName) => processFile(dir, fileName));
}

export { getData };
