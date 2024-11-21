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
	console.log(req.body);
	const text = req.body;
	console.log(text)
	await api.sendMessage(762569950, text);
	res.send("200");
});

export const startServer = () => {
	app.listen(port, () => {
		console.log("Server listening on port " + port);
	});
};
