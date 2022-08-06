import { resolve } from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

const common: Configuration | DevServerConfiguration = {
  entry: "./src/index",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  output: {
    path: resolve(__dirname, "../dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:5000/graphql"),
    }),
  ],
};

export default common;
