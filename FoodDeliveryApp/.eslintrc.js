module.exports = {
  root: true,
  extends: '@react-native-community',
  //If you are encountering the "Parsing error: No Babel config file detected" issue specifically in Visual Studio Code with ESLint, configure the eslint.workingDirectories setting.
   "eslint.workingDirectories": [
        {"mode": "auto"}
    ],
};
