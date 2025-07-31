import imaps from "imap-simple";
import { categorizeEmail } from "./aiService";
import { parseEmail } from "../utils/emailParser";
import { imapAccounts } from "../config/imapConfig";
import { saveEmail } from "./elasticService";
import { sendSlackNotification, triggerWebhook } from "./notificationService";

export const startImapConnections = async () => {
  for (const account of imapAccounts) {
    try {
      const connection = await imaps.connect(account);
      await connection.openBox("INBOX");

      console.log(`✅ Connected to ${account.imap.user}`);

      // Fetch emails from last 30 days
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - 30);

      const searchCriteria = ["ALL", ["SINCE", sinceDate.toISOString()]];
      const fetchOptions = { bodies: [""], markSeen: false };

      const messages = await connection.search(searchCriteria, fetchOptions);

      for (const item of messages) {
        const all = item.parts?.find((p: any) => p.which === "");
        if (!all?.body) {
          console.warn("⚠️ Could not parse email: No body found");
          continue;
        }

        const parsed = await parseEmail(all.body);
        const category = categorizeEmail(parsed.subject, parsed.text);

        await saveEmail({
          subject: parsed.subject,
          from: parsed.from,
          to: parsed.to,
          date: parsed.date,
          text: parsed.text,
          folder: "INBOX",
          account: account.imap.user,
          category,
        });
        if (category === "Interested") {
          await sendSlackNotification(parsed.subject, parsed.from);
          await triggerWebhook({
            subject: parsed.subject,
            from: parsed.from,
            date: parsed.date,
            category,
          });
        }

        console.log("📧 Stored Email:", parsed.subject);
      }

      // Listen for new emails in real-time
      connection.on("mail", async () => {
        console.log("🔔 New email detected!");
        const newMessages = await connection.search(["UNSEEN"], fetchOptions);

        for (const item of newMessages) {
          const all = item.parts?.find((p: any) => p.which === "");
          if (!all?.body) {
            console.warn("⚠️ Could not parse email: No body found");
            continue;
          }

          const parsed = await parseEmail(all.body);
          const category = categorizeEmail(parsed.subject, parsed.text);

          await saveEmail({
            subject: parsed.subject,
            from: parsed.from,
            to: parsed.to,
            date: parsed.date,
            text: parsed.text,
            folder: "INBOX",
            account: account.imap.user,
            category,
          });
          if (category === "Interested") {
            await sendSlackNotification(parsed.subject, parsed.from);
            await triggerWebhook({
              subject: parsed.subject,
              from: parsed.from,
              date: parsed.date,
              category,
            });
          }

          console.log("📩 New Email Stored:", parsed.subject);
        }
      });
    } catch (err) {
      console.error(`❌ IMAP error for ${account.imap.user}:`, err);
    }
  }
};
