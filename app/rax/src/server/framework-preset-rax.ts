import { TransformOptions } from '@babel/core';

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
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      [
        '@babel/plugin-transform-typescript',
        {
          jsxPragma: 'createElement',
          jsxPragmaFrag: 'Fragment',
          isTSX: true,
        },
      ],
      '@babel/plugin-syntax-jsx',
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
