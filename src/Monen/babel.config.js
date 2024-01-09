module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          components: "./src/components",
          _main: "./src/components/_main",
          screens: "./src/screens",
          config: "./src/config",
          navigations: "./src/navigations",
          utils: "./src/utils",
          actions: "./src/state/actions",
          constants: "./src/constants",
          contexts: "./src/state/contexts",
          reducers: "./src/state/reducers",
          assets: "./src/assets/",
          hooks: "./src/hooks",
          data: "./src/data",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
