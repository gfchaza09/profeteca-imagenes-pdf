const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environments.ts";

const apiUrl = process.env["API_URL"] ?? "http://localhost:8080";
const localMode =
  (process.env["LOCAL_MODE"] ?? "true").toLowerCase() === "true";

const envFileContent = `
export const environment = {
    apiUrl: "${apiUrl}",
    localMode: ${localMode},
}
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
