import type { createTestPlugin as _createTestPlugin, Indexable } from '@/index.d';
import { ensureDirSync, readFileSync, writeFileSync } from "fs-extra";
import path from "path";

const DEFAULT_TEMPLATE = "index.html";
const DEFAULT_ENTRY_PATH = process.cwd();
const ignoreDirs = [".", "", "/"];

const ensureDirectoryExistence = (filePath: string): boolean => {
  const dirname = path.resolve(filePath);

  ensureDirSync(dirname);

  return true;
}

const createTmpIndex = (env: Indexable, entry?: string) => {
  let dirPath;

  if (entry) {
    ignoreDirs.forEach((dir) => {
      dirPath = entry?.replaceAll(dir, '');
    });
  }

  const indexPath = `${DEFAULT_ENTRY_PATH}/${dirPath || DEFAULT_TEMPLATE}`;
  const tmpPath = `${DEFAULT_ENTRY_PATH}/tmp`;

  let template = readFileSync(indexPath, 'utf8');

  if (ensureDirectoryExistence(tmpPath)) {
    Object.entries(env).forEach(([key, value]) => {
      const regex = new RegExp(key, 'gi')
  
      template = template.replace(regex, value);
    });

    writeFileSync(`${tmpPath}/index.html`, template);
  }
};

export const createTestPlugin: typeof _createTestPlugin = (userOptions) => {
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
      createTmpIndex(variables, entry);
    },
  };
};
