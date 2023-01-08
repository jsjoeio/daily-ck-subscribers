import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v1.0.1/mod.ts";

function getEnvVar(key: string) {
  if (Deno.env.get("GITHUB_ACTIONS") === "true") {
    return Deno.env.get(key);
  } else {
    console.log("getting env vars from .env");
    const envVars = dotEnvConfig({});
    return envVars[key];
  }
}

const CK_API_SECRET_KEY = getEnvVar("CK_API_SECRET_KEY");
const TELEGRAM_API_BOT_TOKEN = getEnvVar("TELEGRAM_API_BOT_TOKEN");

const apiBaseUrl = "https://api.convertkit.com/v3";

async function getTotalSubscribers(): Promise<number> {
  const res = await fetch(
    `${apiBaseUrl}/subscribers?api_secret=${CK_API_SECRET_KEY}`,
  );
  const data = await res.json();
  return data.total_subscribers;
}

const telegramApiBaseUrl = "https://api.telegram.org/bot";

async function sendMessage(text: string): Promise<void> {
  const res = await fetch(
    `${telegramApiBaseUrl}${TELEGRAM_API_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "751913803",
        text: text,
      }),
    },
  );
  if (res.status !== 200) {
    throw new Error(`Failed to send message: ${await res.text()}`);
  }
}

export { dotEnvConfig, getTotalSubscribers, sendMessage };
