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

const staticDir = path.join(root, ".vercel/output/static");
fs.mkdirSync(staticDir, { recursive: true });

// Copy client assets (JS, CSS, images) → static
copyDir(path.join(root, "dist/client"), staticDir);

// Import the SSR server and pre-render each route to HTML
const { default: server } = await import(
  path.join(root, "dist/server/server.js")
);

const routes = ["/", "/work"];

for (const route of routes) {
  const response = await server.fetch(
    new Request(`http://localhost${route}`),
    {},
    {}
  );
  const html = await response.text();

  if (route === "/") {
    fs.writeFileSync(path.join(staticDir, "index.html"), html);
  } else {
    const dir = path.join(staticDir, route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  }

  console.log(`✓ pre-rendered ${route}`);
}

// Vercel output config — static only, SPA fallback for client-side nav
fs.writeFileSync(
  path.join(root, ".vercel/output/config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index.html" },
    ],
  })
);

console.log("✓ Vercel static output built at .vercel/output/");
