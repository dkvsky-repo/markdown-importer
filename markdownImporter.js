import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getDirectory(contentType) {
  return path.join(process.cwd(), `markdown/${contentType}`);
}

/**
 * Return data from .md files.
 * 
 * @param {string} contentType: The type of content, i.e; 'pages', 'posts', etc.
 * @param {string} subDir: A subdirectory under content type, i.e; 'experiences' in 'resume/experiences'.
 */
function getData(contentType, subDir = undefined) {
  let dir = getDirectory(contentType);
  if (subDir) {
    dir += `/${subDir}`;
  }

  const fileNames = (fs.readdirSync(dir)).filter(name => name.match(/\.md$/));

  const data = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      meta: matterResult.data,
      content: matterResult.content
    };
  });
  
  return data;
}

export { getData };