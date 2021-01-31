import { VueConstructor, PluginFunction } from "vue";

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

export const version: string;

export function install(vue: VueConstructor, options: InstallFunction): void;

export * as Dialog from "./dialog";