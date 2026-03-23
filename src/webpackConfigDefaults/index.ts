import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

interface WebpackConfigOptions {
  appName: string;
  exposes?: Record<string, string>;
  shared?: Record<string, object>;
  port?: number;
}

const defaultShared = {
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router-dom': { singleton: true },
  '@tanstack/react-query': { singleton: true },
  zustand: { singleton: true },
  '@bka-stuff/mfe-utils': { singleton: true },
};

export default function createWebpackConfig(options: WebpackConfigOptions): Configuration {
  const { appName, exposes = {}, shared = {}, port = 3000 } = options;

  return {
    mode: 'development',
    entry: './src/index.ts',

    output: {
      publicPath: 'auto',
      uniqueName: appName,
      chunkLoadingGlobal: `webpackChunk_${appName}`,
      crossOriginLoading: 'anonymous',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      symlinks: true,
      alias: {
        axios: path.resolve(__dirname, 'node_modules/axios'),
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.container.ModuleFederationPlugin({
        name: appName,
        filename: 'remoteEntry.js',
        exposes,
        shared: { ...defaultShared, ...shared },
      }),
    ],

    devServer: {
      port,
      hot: false,
      historyApiFallback: true,
      client: {
        overlay: {
          warnings: false,
          errors: true,
          runtimeErrors: (error) => !error.message.includes('ResizeObserver loop'),
        },
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    },
  };
}
