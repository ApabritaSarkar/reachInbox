import { ImapSimpleOptions } from "imap-simple";
import dotenv from "dotenv";
dotenv.config();

export const imapAccounts: ImapSimpleOptions[] = [
  {
    imap: {
      user: process.env.IMAP_USER1!,
      password: process.env.IMAP_PASS1!,
      host: process.env.IMAP_HOST1!,
      port: Number(process.env.IMAP_PORT1!),
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000,
    },
  },
  {
    imap: {
      user: process.env.IMAP_USER2!,
      password: process.env.IMAP_PASS2!,
      host: process.env.IMAP_HOST2!,
      port: Number(process.env.IMAP_PORT2!),
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000,
    },
  },
];
