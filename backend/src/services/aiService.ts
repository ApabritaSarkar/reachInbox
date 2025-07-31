export type EmailCategory =
  | "Interested"
  | "Meeting Booked"
  | "Not Interested"
  | "Spam"
  | "Out of Office";

export const categorizeEmail = (subject: string, text: string): EmailCategory => {
  const content = `${subject} ${text}`.toLowerCase();

  if (content.includes("meeting") || content.includes("schedule")) {
    return "Meeting Booked";
  }
  if (content.includes("interested") || content.includes("let's connect")) {
    return "Interested";
  }
  if (content.includes("not interested") || content.includes("unsubscribe")) {
    return "Not Interested";
  }
  if (content.includes("out of office") || content.includes("away")) {
    return "Out of Office";
  }
  if (content.includes("lottery") || content.includes("win money") || content.includes("click here")) {
    return "Spam";
  }
  return "Not Interested";
};
