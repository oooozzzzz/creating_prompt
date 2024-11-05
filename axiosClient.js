import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.AMO_CRM_API_KEY;
export const amoCRM = axios.create({
	baseURL: "https://retention01.amocrm.ru/api/v4/",
	timeout: 1000,
	headers: { Authorization: `Bearer ${token}` },
});