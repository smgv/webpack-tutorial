## Webpack Tutorial

without webpack.config.js if you want to run than use - node_modules/.bin/webpack

```js
// create the build
"build": "webpack",
// it triggers the devServer
"dev": "webpack serve"
```

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // Single entry point
  // entry: "./src/index.js",
  // entry: path.resolve(__dirname, "src", "index.js"),

  // Multiple entry points
  // entry point of our application
  entry: {
    bundle: path.resolve(__dirname, "src", "index.js"),
  },

  // To specify the mode of the webpack
  // it can be development or production
  // development mode is used to generate the source map
  // production mode is used to minify the code
  mode: "production",

  output: {
    // To specify the output file name
    // contenthash is required to cache the file because if the file is not changed then the contenthash will be the same otherwise it will be changed
    // use case of contenthash: if the file is not changed then the browser will not download the file again
    // if we keep the filename as bundle.js then the browser will download the file again and again
    filename: "[name].[contenthash].js",
    // To specify the output path of the file
    path: path.resolve(__dirname, "build"),
    // To clean the build folder before creating a new build
    clean: true,
    // To specify the asset module filename
    // if we want to keep the original name of the file
    // [hash] is used to cache the file
    // [ext] is used to keep the file extension
    // [name] is used to keep the original name of the file
    // assetModuleFilename: "[hash][ext]",
    assetModuleFilename: "[name][ext]",
  },

  //ERROR: You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
  // To handle the file types other than js like css, scss, etc
  // fo that we need to use loaders
  module: {
    rules: [
      // To handle the scss files
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // babel loader is used to convert the ES6 code to ES5
      // To handle the js files
      // exclude is used to exclude the node_modules folder
      // use is used to specify the loader to use
      // @babel/preset-env is used to convert the ES6 code to ES5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // To use the preset env
            presets: ["@babel/preset-env"],
          },
        },
      },
      // To handle the images / fonts / other assets
      // asset/resource is used to copy the files to the build folder
      // asset/inline is used to convert the files to base64
      // type is used to specify the type of the asset
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  // to include the html file using HTMLWebpackPlugin
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "template.html"),
      title: "Webpack App",
      filename: "index.html",
    }),
    // To analyze the bundle size
    new BundleAnalyzerPlugin(),
  ],

  // To run the dev server
  // static is used to serve the files from the build folder
  // port is used to run the server on the port 4000
  // open is used to open the browser
  // compress is used to compress the files using gzip
  // hot is used to hot reload the files
  // historyApiFallback is used to handle the routes in SPA applications like React Router to always serve the index.html file
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 4000,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },

  // To generate source map to debug the code
  devtool: "source-map",
};
```
