import e from "express";

import { token } from "./middleware/jwt.js";
import { PORT, INT } from "./config.js";
import cookieParser from "cookie-parser";

const app = e();

app.disable("x-powered-by");

app.use(cookieParser());
app.use(token);

app.get("/", (req, res) => {
    const { lang } = req.session;

    res.sendFile("index.html", { root: `./views/${lang}` });
});

app.listen(PORT, INT, () => {
    console.log("Server is listening on port:", INT, PORT);
})