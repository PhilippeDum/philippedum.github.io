import fs from "fs";
import path from "path";

const JSON_FILE_PATH = "public/devfolio_data.json";

export function getData() {
    const filePath = path.join(process.cwd(), JSON_FILE_PATH);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
}