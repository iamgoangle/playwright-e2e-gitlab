# 🎭 Playwright E2E Testing
This project aims to provide an end-to-end testing solution for a web application using playwright automated tests. The tests are designed to cover the various functionalities of the application and ensure that they are working as expected.

**Table of Contents**

- [🎭 Playwright E2E Testing](#ui-e2e-testing)
  - [Getting started](#getting-started)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
  - [Run Locally](#run-locally)
    - [Runs the end-to-end tests](#runs-the-end-to-end-tests)
    - [Auto generate tests with Codegen](#auto-generate-tests-with-codegen)
    - [Runs the tests only Chrome](#runs-the-tests-only-chrome)
  - [Test Report](#test-report)
  - [CI/CD](#cicd)
    - [How to update docker playwright to be latest version?](#how-to-update-docker-playwright-to-be-latest-version)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
    - [Project structure guideline](#project-structure-guideline)
  - [Support](#support)
  
## Getting started

## Installation

### Prerequisites
- Install [Node.js](https://nodejs.org/en/download/).
- Install project dependencies via `npm i or yarn i`.

## Run Locally
### Runs the end-to-end tests
```sh
// npm
npx playwright test

// yarn
yarn playwright test
```

### Auto generate tests with Codegen
```sh
// npm
npx playwright codegen

// yarn
yarn playwright codegen
```

### Runs the tests only Chrome
```sh
npx playwright test --project=chromium
```
we recommend you see the configurations from `./playwright.config.ts` for test driver.

## Test Report
Once the test finished, it will have been created which shows you a full report of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests.
```sh
npx playwright show-report
```

## Documentation
- [Annotation](https://playwright.dev/docs/test-annotations)
- [Assertion](https://playwright.dev/docs/test-assertions)