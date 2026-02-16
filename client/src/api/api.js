const TOKEN_KEY = "sdg4_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function getBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || "";
}

async function handleResponse(res) {
  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Request failed (${res.status})`;
    const err = new Error(msg);
    err.statusCode = res.status;
    throw err;
  }

  return data;
}

export async function apiGet(path, authed = true) {
  const headers = { "Content-Type": "application/json" };
  if (authed) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getBaseUrl()}${path}`, { headers });
  return handleResponse(res);
}

export async function apiPost(path, body, authed = true) {
  const headers = { "Content-Type": "application/json" };
  if (authed) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body || {}),
  });

  return handleResponse(res);
}

export async function apiPut(path, body, authed = true) {
  const headers = { "Content-Type": "application/json" };
  if (authed) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body || {}),
  });

  return handleResponse(res);
}
