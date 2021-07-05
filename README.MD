# Movies App
Movies app displaying upcoming movies from TMDb

## Setting up development environment
* Install node, yarn
* Install Android Studio, XCode
* Editor VSCode
* Extensions: Eslint, prettier

## Getting Started
Before running any of the scripts listed bellow, it is necessary to have all the packages installed, a.k.
a. yarn

* Scripts:
  * yarn start -> starts the development server.
  * yarn test -> runs the unit tests.
  * yarn test:coverage -> prints out the coverage in the terminal and generates the report.
  * yarn test:coverage:open -> displays the code coverage in a browser.
  * yarn lint -> goes through the code and checks for linting issues.
  * yarn lint:types -> goes through the code and checks for typescript violations.
  * yarn lint:fix -> goes through the code and checks for linting issues and fixes them where possible.
  * yarn clean:android -> cleans the android project artifacts, requires gradlew sync afterwards.
  * yarn build:android -> builds the release apk.