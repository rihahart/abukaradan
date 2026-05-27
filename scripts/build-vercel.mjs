import fs from "fs";
import path from "path";

const root = process.cwd();

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

// Clean previous output
fs.rmSync(path.join(root, ".vercel/output"), { recursive: true, force: true });

// Create directory structure
const staticDir = path.join(root, ".vercel/output/static");
const funcDir = path.join(root, ".vercel/output/functions/render.func");
fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(funcDir, { recursive: true });

// Copy client assets → static
copyDir(path.join(root, "dist/client"), staticDir);

// Copy server bundle → function directory
copyDir(path.join(root, "dist/server"), funcDir);

// Edge function entry: wraps the fetch handler
fs.writeFileSync(
  path.join(funcDir, "index.js"),
  `import server from "./server.js";
export default function handler(request) {
  return server.fetch(request, {}, {});
}
`
);

// Vercel edge function config
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" })
);

// Vercel output routing config
fs.writeFileSync(
  path.join(root, ".vercel/output/config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/render" },
    ],
  })
);

console.log("✓ Vercel output built at .vercel/output/");
