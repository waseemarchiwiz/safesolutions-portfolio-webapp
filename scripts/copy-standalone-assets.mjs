import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");
const copyTargets = [
  {
    source: path.join(rootDir, ".next", "static"),
    destination: path.join(standaloneDir, ".next", "static"),
  },
  {
    source: path.join(rootDir, "public"),
    destination: path.join(standaloneDir, "public"),
  },
];

for (const { source, destination } of copyTargets) {
  if (!existsSync(source)) {
    continue;
  }

  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}
