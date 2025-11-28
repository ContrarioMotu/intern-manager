const API_URL = process.env.REACT_APP_API_URL; // tu backend FastAPI

// Helper para GET
export async function apiGet(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  return res.json();
}

// Helper para POST
export async function apiPost(endpoint, body = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

// Helper para PUT
export async function apiPut(endpoint, body = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}
