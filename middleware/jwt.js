import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { JWT_PASS } from "../config.js";

export function token(req, res, next) {
    if (!req.session) {
        if(!req.cookies.token) {
            // Creamos el body
            const body = CreateBody();
            // Creamos el token
            const token = CreateJWT(body);
            // Creamos la cookie
            updateCookie(res, token);
            // Mutamos la req
            req.session = body;
        }else {
            req.session = jwt.verify(req.cookies.token, JWT_PASS);
        }
    } else {
        try {
            const token = jwt.verify(req.cookie.token, JWT_PASS);

            req.session = token;
        } catch {
            req.session = null;
        }
    }
    // Seguimos adelante
    next();
}

function CreateBody() {
    return {
        id: crypto.randomUUID(),
        lang: "es"
    }
}

function CreateJWT(content) {
    return jwt.sign(content, JWT_PASS, { expiresIn: "1w" });
}

function updateCookie(res, token) {
    res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "strict",
        httpOnly: true
    });
}