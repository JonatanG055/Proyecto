module.exports = {
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
          },
        },
      ],
    },
  },

  chainWebpack: config => {
    config.resolve.extensions.add('.ts').add('.tsx');
  },

  devServer: {
    proxy: 'http://localhost:3000',
  },

  pluginOptions: {
    vue: {
      runtimeCompiler: true
    }
  }
};
