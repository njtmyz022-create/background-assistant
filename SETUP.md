# Setup (about 10 minutes, free tiers)

## 1. Relay (Cloudflare Workers)
1. dash.cloudflare.com > Workers & Pages > Create > Worker > paste worker.js > Deploy.
2. Worker > Settings > Variables and Secrets, add two secrets:
   - API_KEY = your AutoGPT API key (Settings > API Keys; run + read permissions)
   - APP_TOKEN = any long random string you make up
3. Copy the worker URL (https://xxx.workers.dev).

## 2. App
1. Host this folder on HTTPS (Cloudflare Pages "Upload assets", Netlify Drop, or GitHub Pages).
2. Open the link in Chrome on Android > menu > Add to Home screen.
3. In the app tap the gear: relay URL, APP_TOKEN. Save.

Offline: tasks you send without a connection are queued on the phone and sent automatically when you're back online. Once sent, they run in the cloud and results are stored in the app.
