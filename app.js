import e from "express";

import { PORT, INT } from "./config.js";

const app = e();

app.disable("x-powered-by");

app.get("/", (_, res) => {
    res.send("Hola");
});

app.listen(PORT, INT, () => {
    console.log("Server is listening on port:",INT,PORT);
})