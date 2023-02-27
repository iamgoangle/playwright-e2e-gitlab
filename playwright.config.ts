import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import { generateSlackReport } from "./slack";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// Override any environment variables that have already been set on your machine with values from your .env file.
require('dotenv').config({ override: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        channels: [process.env.SLACK_CHANNEL], // provide one or more Slack channels
        sendResults: "always", // "always" , "on-failure", "off"
        layout: generateSlackReport,
        maxNumberOfFailuresToShow: process.env.SLACK_MAX_NUM_FAILURE_TO_SHOW,
        meta: [
          {
            key: "👷🏻‍♀️ Trigger by",
            value: process.env.GITLAB_USER_NAME,
          },
          // {
          //   key: "Environment",
          //   value: process.env.ENVIRONMENT,
          // },
          {
            key: "🔍 E2E folder",
            value: process.env.E2E_FOLDER,
          },
          {
            key: "📟 Commit",
            value: process.env.CI_COMMIT_SHORT_SHA,
          },
          {
            key: "📩 Commit Message",
            value: process.env.CI_COMMIT_MESSAGE,
          },
          {
            key: "📊 HTML Artifact Result",
            value: `${process.env.CI_JOB_URL}/artifacts/file/test-results/report/index.html`,
          },
          {
            key: "🪝 Pipeline URL",
            value: process.env.CI_PIPELINE_URL,
          },
        ],
      },
    ],
    ["list"],
    ["html", { outputFolder: "test-results/report", open: "never" }],
    ["junit", { outputFile: "test-results/report/results.xml" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/out",
};

/* Run your local dev server before starting the tests */
// webServer: {
//   command: 'npm run start',
//   port: 3000,
// },

export default config;
