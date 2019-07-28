const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    historyApiFallback: true,
    open: true,
    overlay: true,
  },
});

// setup load css
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // "style-loader",
          "css-loader"],
      },
    ],
  },
});

// setup load scss
exports.loadSCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        include,
        exclude,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // "style-loader",
          "css-loader",
          "sass-loader"],
      }
    ]
  }
});

// setup load html
exports.loadHtml = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  }
});


// setup load postcss
// const postCssConfig = require('./postcss.config.js');
exports.loadPostCss = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'astroturf/loader'],
      }
    ]
  }
})

exports.loadUrl = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  }
});

exports.loadFile = () => ({
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },
    ]
  }
});

exports.loadSvg = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ]
  }
});



// setep babel for js
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
});

// generate source map
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

// exports.loadBundle = () => ({
//   module: {
//     rules: [
//       {
//         test: /\.bundle\.js$/,
//         use: {
//           loader: 'bundle-loader',
//           options: {
//             name: '[name]'
//           }
//         }
//       }
//     ]
//   }
// })