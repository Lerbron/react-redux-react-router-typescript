const webpack = require('webpack')
const {
  merge
} = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require("glob-all");
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const {
  resolve
} = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          }
        }
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      algorithm: 'gzip',
      compressionOptions: { level: 5 },
      exclude:'config.js',
    }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync([
    //     `${resolve(__dirname, "../src")}/**/*`,
    //     `${resolve(__dirname, "../src")}/**/**/*`,
    //     `${resolve(__dirname, "../public/*.html")}`,
    //   ], {
    //     nodir: true
    //   }),
    // }),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, './../favicon.ico'), to: resolve(__dirname , './../dist/favicon.ico') },
      ],
    }),
  ]
})