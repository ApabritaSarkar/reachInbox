import { simpleParser, ParsedMail } from "mailparser";

// Helper function to handle AddressObject or AddressObject[]
const extractAddress = (address: any): string => {
  if (!address) return "";
  if (address.text) return address.text;
  if (Array.isArray(address.value)) {
    return address.value.map((a: any) => a.address).join(", ");
  }
  return "";
};

export const parseEmail = async (rawEmail: string) => {
  const parsed: ParsedMail = await simpleParser(rawEmail);

  return {
    subject: parsed.subject || "",
    from: extractAddress(parsed.from),
    to: extractAddress(parsed.to),
    date: parsed.date || new Date(),
    text: parsed.text || "",
    html: parsed.html || "",
  };
};
