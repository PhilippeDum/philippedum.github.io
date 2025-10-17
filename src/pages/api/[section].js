import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "devfolio_data.json");

export default function handler(req, res) {
    const { section } = req.query; // récupère "content", "projects", "categories", etc.

    // lire le JSON
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // vérifier que la section existe
    if (!data[section]) {
        return res.status(404).json({ error: "Section not found" });
    }

    const items = data[section];

    if (req.method === "GET") {
        res.status(200).json(items);
    }
    else if (req.method === "POST") {
        const newItem = req.body;
        newItem.id = Date.now();
        items.push(newItem);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(201).json(newItem);
    }
    else if (req.method === "PUT") {
        const id = parseInt(req.query.id);
        const index = items.findIndex(x => x.id === id);
        if (index === -1) return res.status(404).end();
        items[index] = req.body;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(200).json(items[index]);
    }
    else if (req.method === "DELETE") {
        const id = parseInt(req.query.id);
        data[section] = items.filter(x => x.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(204).end();
    }
    else {
        res.status(405).end(); // méthode non autorisée
    }
}
