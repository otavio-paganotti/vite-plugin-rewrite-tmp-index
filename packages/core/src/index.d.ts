import type { PluginOption } from "vite";

interface Indexable<T = string> {
  [key: string]: T;
}

interface UserOptions {
  data: Indexable;
  entry?: string;
  config: {
    command: string;
    mode: string;
  };
}

declare function rewriteIndexPlugin(userOptions: UserOptions): PluginOption;

export { Indexable, UserOptions };

export default rewriteIndexPlugin;
