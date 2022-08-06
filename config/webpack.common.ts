import { resolve } from "node:path";
import { Configuration } from "webpack";
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
    filename: "main-bundle-[fullhash].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
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
    ],
  },
};

export default common;
