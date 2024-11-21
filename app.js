import express from "express";
const port = 8080;
export const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
	res.send(req.body);
});

app.post("/", (req, res) => {
	res.send("Answer " + req.body);
});

export const startServer = () => {
	app.listen(port, () => {
		console.log("Server listening on port " + port);
	});
};
