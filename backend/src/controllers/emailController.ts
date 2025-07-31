import { Request, Response } from "express";
import { searchEmails, getAllEmails } from "../services/elasticService";

export const getAllEmailsController = async (req: Request, res: Response) => {
  try {
    const emails = await getAllEmails();
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};

export const searchEmailsController = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

    const results = await searchEmails(q as string);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
};
