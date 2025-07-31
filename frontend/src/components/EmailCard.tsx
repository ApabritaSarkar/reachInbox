// src/components/EmailCard.tsx
import type { Email } from "../types";

interface Props {
  email: Email;
}

export default function EmailCard({ email }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4 border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold">{email.subject}</h3>{" "}
      <p className="text-sm text-gray-600">
        From: <span className="font-medium">{email.from}</span> | To: {email.to}{" "}
      </p>{" "}
      <p className="text-sm text-gray-400">
        {new Date(email.date).toLocaleString()}
      </p>
      <p className="mt-2 text-gray-700">{email.text.slice(0, 200)}...</p> {" "}
      <span className="inline-block mt-3 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
        {email.category}{" "}
      </span>{" "}
    </div>
  );
}
