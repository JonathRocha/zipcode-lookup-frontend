import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:5000/graphql"), // TODO: change to production URL
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      baseUrl: "/",
      inject: true,
      template: "./public/index.html",
      cache: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          parse: {
            ecma: 2019,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
});
