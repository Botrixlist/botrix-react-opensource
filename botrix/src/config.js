import dotenv from 'dotenv';

dotenv.config();

export const config = {
    backend: process.env.backend ? process.env.backend : "https://api.btx.lol"
}