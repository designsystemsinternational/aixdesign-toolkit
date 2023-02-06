import fs from "fs";

const name = "./inputs/blobs/utils/bookmarklet";

const code = fs.readFileSync(`${name}.raw.js`, "utf-8");

const file =
  "export const bookmarkletCode = `" +
  code.trim().slice(0, -2).replace(/\s+/g, " ") +
  ".call(this));`;";

fs.writeFileSync(`${name}.js`, file, "utf-8");
