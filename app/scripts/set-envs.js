const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environments.ts";

const envFileContent = `
export const environment = {
    apiUrl: "${process.env["API_URL"]}"
}
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
