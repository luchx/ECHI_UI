import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const Mui: { install: InstallFunction };
export default Mui;

export const MuiSample: VueConstructor<Vue>;
