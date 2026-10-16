// Cloudflare Worker relay. Secrets to set: API_KEY (your AutoGPT key), APP_TOKEN (any long random string).
// Optional variable: BACKEND (default https://backend.agpt.co/external-api/v1)
const ALLOWED = [/^\/graphs\/[\w-]+\/execute\/\d+$/, /^\/graphs\/[\w-]+\/executions\/[\w-]+\/results$/];
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,X-App-Token",
};
export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const url = new URL(req.url);
    if (!env.APP_TOKEN || req.headers.get("X-App-Token") !== env.APP_TOKEN)
      return new Response('{"detail":"Unauthorized"}', { status: 401, headers: cors });
    if (!ALLOWED.some(r => r.test(url.pathname)))
      return new Response('{"detail":"Not allowed"}', { status: 403, headers: cors });
    const base = (env.BACKEND || "https://backend.agpt.co/external-api/v1").replace(/\/$/, "");
    const r = await fetch(base + url.pathname, {
      method: req.method,
      headers: { "X-API-Key": env.API_KEY, "Content-Type": "application/json" },
      body: req.method === "POST" ? await req.text() : undefined,
    });
    return new Response(await r.text(), { status: r.status, headers: { ...cors, "Content-Type": "application/json" } });
  },
};
