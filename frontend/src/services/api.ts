const API_URL = "http://localhost:4000"; // backend URL

export async function fetchEmails() {
  const res = await fetch(`${API_URL}/emails`);
  return res.json();
}

export async function searchEmails(query: string) {
  const res = await fetch(`${API_URL}/emails/search?q=${query}`);
  return res.json();
}
