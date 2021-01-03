const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const plugins = [
  new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "public", "index.html"),
    filename: "index.html",
    favicon: "./src/assets/favicon.ico",
  }),
];
if (process.env.NODE_ENV !== "production") {
  const Dotenv = require("dotenv-webpack");
  plugins.push(new Dotenv());
}

module.exports = {
  entry: [path.resolve(__dirname, "src", "index.jsx")],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          plugins: ["@babel/transform-runtime"],
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
    ],
  },
  plugins,
};
