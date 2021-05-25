import dotenv from 'dotenv';

dotenv.config();

export const PROD_BASE = "";
export const PROD_FRONTEND = "";


export const MONGODB = {
  HOST: "",
  USER: "",
  PASS: "",
  PORT: 27017,
  DATABASE: "botrix",
};

export const BOT = {
  PREFIX: ".",
  TOKEN: "",
};

export const REDISDB = {
  HOST: "",
  PASS: "",
  USER: "",
  PORT: 7319,
}; 

export const DISCORD = {
  API_ENDPOINT: "https://discord.com/api/",
  CLIENT_SECRET: "",
  CLIENT_ID: "", 
  LOGIN_REDIRECT: `${process.env.debug == "true" ? "http://localhost:3001" : PROD_BASE}/v1/oauth/callback`,
  WEB_LOGS_WEBHOOK:
    "",
};

export const EMBED_SETTINGS = {
  color: "#7605f0",
  error: "",
  warning: "" 
}

export const LOGGING = {
  GUILD_ID: "",
  MOD_LOGS: "",
  VOTE_LOGS: ""
};

export const OWNER_OPTIONS = {
  OWNER_ID: "",
};

export const CACHEOPTIONS = {
  TTL: 60,
};

export const HCAPTCHA_SECRET = "";
export const VOTE_TIMEOUT = 43200000; //12 hours 