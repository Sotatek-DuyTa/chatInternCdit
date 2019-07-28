require('dotenv').config();
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack demo",
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  },
  {
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  },
  // parts.loadCSS(),
  // parts.loadHtml(),
  parts.loadSCSS(path.join(__dirname, "src/test.scss")),
  parts.loadPostCss(),
  parts.loadFile(),
  parts.loadUrl(),
  // parts.loadSvg(),
  parts.loadJavaScript(
    {
      include: path.join(__dirname, "src/index.js"),
      exclude: /node_modules/,
    }
  ),
  // parts.loadBundle(),
]);

const productionConfig = merge([
  parts.generateSourceMaps({ type: "source-map" }),
  // {
  //   optimization: {
  //     splitChunks: {
  //       chunks: 'all'
  //     }
  //   }
  // },
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed 
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,

    // host: '0.0.0.0',
    // port: 3000,
  }),
  parts.generateSourceMaps({ type: "source-map" }),
]);

module.exports = mode => {
  process.env.BABEL_ENV = mode;

  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};

// module.exports = () => {
//   return merge(
//     {
//       entry: {
//         index: './src/index.js',
//       },
//       output: {
//         filename: '[name].bundle.js',
//         chunkFilename: '[name].[id].js'
//       },
//     },
//     commonConfig,
//     productionConfig
//   );
// }