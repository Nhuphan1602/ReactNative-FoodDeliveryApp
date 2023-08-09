# ReactNative-FoodDeliveryApp
This repository contains the source code and documentation for a food delivery application developed using React Native, a popular cross-platform mobile application development framework. The app allows users to order food from their favorite restaurants and have it delivered to their location.

## Setup instructions

### 1. Clone Repository

```sh
# Clone the app
git clone https://github.com/nhuphaNn1602/ReactNative-FoodDeliveryApp.git
```

### 2. Install all dependencies

```sh
# navigate to app directory, install npm packages
cd FoodDeliveryApp
npm install
```

for ios:
    ```sh
    cd ios
    ```
    
    ```sh
    # Run the following commands to install the dependencies using bundler, this command will install the necessary Ruby gems specified in the Gemfile
    bundle install
    ```
    
    ```sh
    # Next, execute the CocoaPods installation command
    bundle exec pod install
    ```

for android:
    You can refer to the official React Native documentation for detailed instructions on setting up the Android development environment: https://reactnative.dev/docs/environment-setup

### 3. Setup backend at terminal

```sh
# get ip address
ipconfig getifaddr en0
```

```sh
# setup mongoDB
source ~/.bashrc  
echo $PATH
mongod --dbpath ~/Documents/mongodb-data
```

### 4. Build the app

Get the IP address above and assign it to package.json file of both backend and app folders

```sh
# navigate to backend app directory
npm start
```

```sh
# navigate to app directory,build on ios
npx react-native run-ios or npm run ios
```

```sh
# navigate to app directory,build on android
npx react-native run-android or npm run android
```
