module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["transform-inline-environment-variables"],
    [
      "module-resolver",
      {
        "root": "src",
        "extensions": [
          ".ts",
          ".tsx",
          ".js"
        ],
      }
    ]
  ]
};
