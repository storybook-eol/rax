/* eslint-disable import/no-extraneous-dependencies */
import { TransformOptions } from '@babel/core';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function babelDefault(config: TransformOptions) {
  return {
    ...config,
    presets: [
      ...config.presets,
      [
        require.resolve('babel-preset-rax'),
        { development: process.env.BABEL_ENV === 'development' },
      ],
    ],
    plugins: [
      ...config.plugins,
      ['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }],
      'babel-plugin-transform-jsx-list',
      'babel-plugin-transform-jsx-condition',
      'babel-plugin-transform-jsx-memo',
      'babel-plugin-transform-jsx-slot',
      'babel-plugin-transform-jsx-fragment',
      'babel-plugin-transform-jsx-class',
      ['babel-plugin-transform-jsx-stylesheet', { retainClassName: true }],
    ],
  };
}

export function webpackFinal(config: Configuration) {
  const cssRuleIndex = config.module.rules.findIndex(
    (rule) => rule.test.toString() === '/\\.css$/'
  );
  if (cssRuleIndex) {
    config.module.rules.splice(cssRuleIndex, 1);
  }

  const stylesLoaders = [
    'css-loader',
    'postcss-loader',
    {
      loader: 'webpack-rpx',
      options: {
        width: 750,
        unit: 'rpx',
      },
    },
  ];

  const lessLoaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'less-loader',
    'postcss-loader',
    {
      loader: 'webpack-rpx',
      options: {
        width: 750,
        unit: 'rpx',
      },
    },
  ];

  config.module.rules.push({
    test: /\.css$/,
    use: stylesLoaders,
  });

  config.module.rules.push({
    test: /\.less$/,
    use: lessLoaders,
  });

  return {
    ...config,
    plugins: [...config.plugins, new MiniCssExtractPlugin()],
  };
}
