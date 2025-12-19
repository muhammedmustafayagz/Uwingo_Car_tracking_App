module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.jsx'],
        alias: {
          '@': './src',
          '/assets': "./assets"
        },
      }
    ],

    'react-native-paper/babel',
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin',
  ],
};



