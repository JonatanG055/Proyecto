const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            // Opcional: Si usas Vue 3, añade esta opción para el soporte completo de Vue 3
            // happyPackMode: false,
          },
        },
      ],
    },
  },

  chainWebpack: config => {
    config.resolve.extensions.add('.ts').add('.tsx'); // Añadir .tsx si usas JSX en TypeScript
  },

  // Opcional: Añadir soporte para Vue 3 si es necesario
  pluginOptions: {
    vue: {
      runtimeCompiler: true
    }
  }
});
