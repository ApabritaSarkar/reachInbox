import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import EmailCard from "../components/EmailCard";
import EmailDetailModal from "../components/EmailDetailModal";
import { fetchEmails, searchEmails } from "../services/api";

const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    const data = await fetchEmails();
    setEmails(data);
  };

  const handleSearch = async (query: string) => {
    if (!query) return loadEmails();
    const data = await searchEmails(query);
    setEmails(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-black mb-4">📥 Inbox</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="grid gap-4 mt-4">
        {emails.map((email, i) => (
          <EmailCard
            key={i}
            subject={email.subject}
            from={email.from}
            date={email.date}
            category={email.category}
            onClick={() => setSelectedEmail(email)}
          />
        ))}
      </div>

      <EmailDetailModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  );
};

export default Inbox;
