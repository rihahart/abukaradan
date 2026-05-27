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

// Node.js serverless function: bridges Node req/res → fetch handler
fs.writeFileSync(
  path.join(funcDir, "index.js"),
  `import server from "./server.js";

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers["host"];
  const url = \`\${proto}://\${host}\${req.url}\`;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length > 0 ? Buffer.concat(chunks) : null;

  const webRequest = new Request(url, {
    method: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers).filter(([, v]) => v !== undefined)
    ),
    body: req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
  });

  const response = await server.fetch(webRequest, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  res.end(Buffer.from(await response.arrayBuffer()));
}
`
);

// Node.js serverless function config
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "index.js",
    launcherType: "Nodejs",
  })
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
