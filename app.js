import express from "express";
const port = 8080;
export const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

export const startServer = () => {
	app.listen(port, () => {
		console.log("Server listening on port " + port);
	});
};
