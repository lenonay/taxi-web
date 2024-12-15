import fs, { createWriteStream } from "node:fs";

const db_tables = ["users", "stats"]

export function InitDB() {
    // Verificar si existe el archivo db
    if (!fs.existsSync("./db.json")) {
        CreateDB();
        return;
    }
    // Leemos el contenido
    try {
        let content = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    db_tables.forEach(table => {
        // Si no esta la tabla la añadimos
        if (!content[table]) content[table] = [];
    });

    // Guardamos los cambios
    fs.writeFileSync("./db.json", JSON.stringify(content), "utf8");
    } catch {
        CreateDB();
    }

}

function CreateDB() {
    // Creamos el cuerpo vacio
    let body = {};

    // Iteramos por cada tabla y la añadimos
    db_tables.forEach(table => body[table] = []);

    // Guardamos los cambios
    fs.writeFileSync("./db.json", JSON.stringify(body), "utf8");
}