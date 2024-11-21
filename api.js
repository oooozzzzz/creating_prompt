import { Api } from "grammy";
import dotenv from "dotenv";
dotenv.config();

export const api = new Api(process.env.TOKEN);
