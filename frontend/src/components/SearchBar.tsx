import { useState } from "react";

export const SearchBar = ({ onSearch }: { onSearch: (query?: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search emails..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 rounded border border-gray-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};