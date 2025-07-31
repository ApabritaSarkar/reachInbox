import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const slackUrl = process.env.SLACK_WEBHOOK_URL!;
const webhookUrl = process.env.OUTGOING_WEBHOOK_URL!;

export const sendSlackNotification = async (subject: string, from: string) => {
  if (!slackUrl) return;
  try {
    await axios.post(slackUrl, {
      text: `📩 *Interested Email Detected!*\n*Subject:* ${subject}\n*From:* ${from}`
    });
    console.log("✅ Slack notification sent.");
  } catch (err) {
    console.error("❌ Slack notification failed:", err);
  }
};

export const triggerWebhook = async (emailData: any) => {
  if (!webhookUrl) return;
  try {
    await axios.post(webhookUrl, emailData);
    console.log("✅ Webhook triggered.");
  } catch (err) {
    console.error("❌ Webhook trigger failed:", err);
  }
};
