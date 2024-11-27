import bodyParser from "body-parser";
import express from "express";
import { api } from "./api.js";
const port = 8080;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/", async (req, res) => {
	const message = JSON.parse(req.body);
	const { senderId, results } = handleMessage(message);
	await api.sendMessage(762569950, `Вопрос от @${senderId}\n\n${results}`);
	res.send("200");
});

export const startServer = () => {
	app.listen(port, () => {
		console.log("Server listening on port " + port);
	});
};
