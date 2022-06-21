import _rewriteIndexPlugin, { Indexable } from './index.d';
import { ensureDirSync, readFileSync, writeFileSync } from "fs-extra";
import path from "path";

const DEFAULT_TEMPLATE = "index.html";
const DEFAULT_ENTRY_PATH = process.cwd();
const ignoreDirs = [".", "", "/"];

const ensureDirectoryExistence = (filePath: string): boolean => {
  const dirname = path.resolve(filePath);

  console.log('9');

  ensureDirSync(dirname);

  console.log('10');

  return true;
}

const createTmpIndex = (env: Indexable, entry?: string) => {
  let dirPath;

  console.log('1');

  if (entry) {
    ignoreDirs.forEach((dir) => {
      dirPath = entry?.replaceAll(dir, '');
    });
  }

  console.log('2');

  const indexPath = `${DEFAULT_ENTRY_PATH}/${dirPath || DEFAULT_TEMPLATE}`;
  const tmpPath = `${DEFAULT_ENTRY_PATH}/tmp`;

  let template = readFileSync(indexPath, 'utf8');

  console.log('3');

  console.log('4');

  if (ensureDirectoryExistence(tmpPath)) {

    console.log('5');

    Object.entries(env).forEach(([key, value]) => {
      const regex = new RegExp(key, 'gi')
  
      template = template.replace(regex, value);
    });

    console.log('6');

    writeFileSync(`${tmpPath}/index.html`, template);

    console.log('7');
  }

  console.log('8');
};

const rewriteIndexPlugin: typeof _rewriteIndexPlugin = (userOptions) => {
  const {
    entry,
    config,
    data: variables,
  } = userOptions;

  if (config.mode !== 'development') return;

  return {
    name: "vite:html",
    enforce: "pre",
    handleHotUpdate() {
      console.log('cheguei aqui', variables, entry)
      console.log('ensureDirSync', ensureDirSync);
      console.log('readFileSync', readFileSync);
      console.log('writeFileSync', writeFileSync);
      createTmpIndex(variables, entry);
    },
  };
};

export default rewriteIndexPlugin;
