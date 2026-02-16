const TOKEN_KEY = "tt_token";

// Prefer explicit env base, otherwise use "" (same-origin) so Vite proxy can handle /api
const ENV_BASE = (import.meta?.env?.VITE_API_BASE_URL || "").trim();
export const API_BASE_URL = ENV_BASE || "";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function buildUrl(path) {
  // Ensure leading slash
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}

async function request(method, path, body, authRequired) {
  const headers = { "Content-Type": "application/json" };

  if (authRequired) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || "" };
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.error ||
      `Request failed (${res.status})`;
    const err = new Error(msg);
    err.statusCode = res.status;
    throw err;
  }

  return data;
}

export function apiGet(path, authRequired = true) {
  return request("GET", path, null, authRequired);
}

export function apiPost(path, body, authRequired = true) {
  return request("POST", path, body, authRequired);
}

export function apiPut(path, body, authRequired = true) {
  return request("PUT", path, body, authRequired);
}
