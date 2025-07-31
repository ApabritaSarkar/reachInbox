import React from "react";

interface EmailCardProps {
  subject: string;
  from: string;
  date: string;
  category: string;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  Interested: "bg-green-100 text-green-800",
  "Meeting Booked": "bg-blue-100 text-blue-800",
  "Not Interested": "bg-gray-100 text-gray-700",
  Spam: "bg-red-100 text-red-800",
  "Out of Office": "bg-yellow-100 text-yellow-800",
};

const EmailCard: React.FC<EmailCardProps> = ({ subject, from, date, category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold">{subject}</h3>
      <p className="text-sm text-gray-600">From: {from}</p>
      <p className="text-xs text-gray-500">{new Date(date).toLocaleString()}</p>
      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${categoryColors[category] || "bg-gray-200"}`}>
        {category}
      </span>
    </div>
  );
};

export default EmailCard;
