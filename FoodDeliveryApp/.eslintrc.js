module.exports = {
  root: true,
  extends: '@react-native-community',
  //If you are encountering the "Parsing error: No Babel config file detected" issue specifically in Visual Studio Code with ESLint, it may be necessary to configure the eslint.workingDirectories setting.
   "eslint.workingDirectories": [
        {"mode": "auto"}
    ],
};
