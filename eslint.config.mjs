import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      }
    }
  },
  pluginJs.configs.recommended,
];
