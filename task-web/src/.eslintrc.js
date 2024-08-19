module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    // Reglas personalizadas
    'vue/attribute-hyphenation': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 3, // Permite hasta 3 atributos en una sola línea
      multiline: 1,  // Permite 1 atributo por línea en elementos multilinea
    }],
    'vue/html-indent': ['error', 2],
  },
};
