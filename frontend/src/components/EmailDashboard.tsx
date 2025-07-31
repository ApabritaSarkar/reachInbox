// src/components/EmailDashboard.tsx
import { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import type { Email } from "../types";

const categories = [
  "All",
  "Interested",
  "Meeting Booked",
  "Not Interested",
  "Spam",
  "Out of Office",
];

export default function EmailDashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchEmails = async () => {
    const res = await fetch("http://localhost:4000/emails");
    const data = await res.json();
    setEmails(data);
  };

  const searchEmails = async () => {
    const endpoint = search
      ? `http://localhost:4000/emails/search?q=${encodeURIComponent(search)}`
      : `http://localhost:4000/emails`;

    const res = await fetch(endpoint);
    const data = await res.json();
    setEmails(data);
  };

  const filteredEmails =
    selectedCategory === "All"
      ? emails
      : emails.filter((email) => email.category === selectedCategory);

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">📬 Email Dashboard</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <input
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder="Search emails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={searchEmails}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        {filteredEmails.length ? (
          filteredEmails.map((email, idx) => (
            <EmailCard key={idx} email={email} />
          ))
        ) : (
          <p className="text-center text-gray-500">No emails found.</p>
        )}
      </div>
    </div>
  );
}
