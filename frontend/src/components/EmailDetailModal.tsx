import React from "react";

interface ModalProps {
  email: any;
  onClose: () => void;
}

const EmailDetailModal: React.FC<ModalProps> = ({ email, onClose }) => {
  if (!email) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-2/3 p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">✖</button>
        <h2 className="text-xl font-bold">{email.subject}</h2>
        <p className="text-sm text-gray-600">From: {email.from}</p>
        <p className="text-sm text-gray-500 mb-4">Date: {new Date(email.date).toLocaleString()}</p>
        <div className="text-gray-800 whitespace-pre-wrap">{email.text}</div>
      </div>
    </div>
  );
};

export default EmailDetailModal;
