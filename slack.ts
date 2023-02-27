import { Block, KnownBlock, MessageAttachment } from "@slack/types";
import { SummaryResults } from "playwright-slack-report/dist/src";

/**
 * @function generateCustomLayout is a custom slack message template for playwright report
 * @param summaryResults
 * @returns Array of Slack message template
 *
 * @author Teerapong Singthong
 */
function generateCustomLayout(
  summaryResults: SummaryResults
): Array<KnownBlock | Block> {
  const meta: { type: string; text: { type: string; text: string } }[] = [];
  if (summaryResults.meta) {
    for (let i = 0; i < summaryResults.meta.length; i += 1) {
      const { key, value } = summaryResults.meta[i];
      meta.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\n*${key}* :\t${value}`,
        },
      });
    }
  }
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          summaryResults.failed === 0
            ? ":tada: All tests passed!"
            : `😭${summaryResults.failed} failure(s) out of ${summaryResults.tests.length} tests`,
      },
    },
    ...meta,
  ];
}

/**
 * @function generateSlackReport is a custom slack message template for playwright report
 * @param summaryResults
 * @returns Array of Slack message template
 *
 * @author Teerapong Singthong
 */
function generateSlackReport(
  summaryResults: SummaryResults
): Array<KnownBlock | Block> {
  const { tests } = summaryResults;

  // Defines result array
  const maxNumberOfFailures = 10;
  const maxNumberOfFailureLength = 650;
  const fails: any[] = [];

  const attachments = [{
    color: "#4CAF50",
  }]

  // header
  const header = {
    type: "header",
    text: {
      type: "plain_text",
      text: "🎭 LINE MAN Playwright E2E Test Results",
      emoji: true,
    },
  };

  // summary section
  const summary = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `🟢 Passed: *${summaryResults.passed}* | 🔴 Failed: *${summaryResults.failed}* | Skipped: 🟡 *${summaryResults.skipped}*`,
    },
  };

  // push fail info
  if (summaryResults.failures.length > 0) {
    fails.push({
      "type": "context",
      "elements": [
        {
          "type": "image",
          "image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
          "alt_text": "error message"
        },
        {
          "type": "mrkdwn",
          "text": "*Failed* description."
        }
      ]
    })
  }

  for (let i = 0; i < summaryResults.failures.length; i += 1) {
    const { failureReason, test } = summaryResults.failures[i];
    const formattedFailure = failureReason
      .substring(0, maxNumberOfFailureLength)
      .split('\n')
      .map((l) => `>${l}`)
      .join('\n');
    fails.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${test}*
        \n\n${formattedFailure}`,
      },
    });
    if (i > maxNumberOfFailures) {
      fails.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*There are too many failures to display, view the full results in BuildKite*',
        },
      });
      break;
    }
  }

  // meta section
  const meta: { type: string; text: { type: string; text: string } }[] = [];
  if (summaryResults.meta) {
    for (let i = 0; i < summaryResults.meta.length; i += 1) {
      const { key, value } = summaryResults.meta[i];
      meta.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\n*${key}*: \t${value}`,
        },
      });
    }
  }

  // start time
  let startedTime = {
    type: "context",
    elements: [
      {
        type: "plain_text",
        text: `⏱ Started Time: ${dateTimeFormat(
          process.env.CI_PIPELINE_CREATED_AT
        )}`,
        emoji: true,
      },
    ],
  };

  // finish time
  let finishedTime = {
    type: "context",
    elements: [
      {
        type: "plain_text",
        text: `⏲ Finished Time: ${dateTimeFormat(Date.now())}`,
        emoji: true,
      },
    ],
  };

  return [
    header,
    summary,
    ...meta,
    { type: "divider" },
    ...fails,
    startedTime,
    finishedTime,
  ];
}

/**
 * @function dateTimeFormat to formatted date time yyyy-MM-dd hh:mm:ss
 * @param timestamp
 * @returns Output: 2023-02-10 07:29:07
 *
 * @author Teerapong Singthong
 */
function dateTimeFormat(timestamp: any): string {
  let date = new Date(timestamp);
  let formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formattedDate;
}

export { generateCustomLayout, generateSlackReport };
