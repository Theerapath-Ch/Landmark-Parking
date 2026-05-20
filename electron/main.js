const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const net = require("net");

let nextServer;
let appPort;

function findFreePort(startPort = 3000) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, "127.0.0.1", () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on("error", () => resolve(findFreePort(startPort + 1)));
  });
}

function waitForPort(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const socket = net.createConnection(port, "127.0.0.1");
      socket.on("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - start > timeout) {
          reject(new Error("Timeout waiting for server"));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

function createWindow(port) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#ffffff",
    show: false,
  });

  win.loadURL(`http://localhost:${port}`);

  win.once("ready-to-show", () => {
    win.show();
    // win.webContents.openDevTools();
  });
}

app.whenReady().then(async () => {
  const isDev = !app.isPackaged;

  if (!isDev) {
    const prismaPath = path.join(
      process.resourcesPath,
      "app",
      ".next",
      "standalone",
      "node_modules",
      ".prisma",
      "client",
      "query_engine-windows.dll.node"
    );
    const dbPath = path.join(process.resourcesPath, "database", "app.db");

    process.env.PRISMA_QUERY_ENGINE_LIBRARY = prismaPath;
    process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = "library";
    process.env.DATABASE_URL = `file:${dbPath}`;
  }

  appPort = await findFreePort(3000);

  const nodePath = process.execPath;

  const serverPath = isDev
    ? path.join(__dirname, "..", ".next", "standalone", "server.js")
    : path.join(process.resourcesPath, "app", ".next", "standalone", "server.js");

  nextServer = spawn(nodePath, [serverPath], {
    env: {
      ...process.env,
      PORT: String(appPort),
      HOSTNAME: "127.0.0.1",
      NODE_ENV: "production",
      PRISMA_QUERY_ENGINE_LIBRARY: process.env.PRISMA_QUERY_ENGINE_LIBRARY,
      PRISMA_CLI_QUERY_ENGINE_TYPE: "library",
      DATABASE_URL: process.env.DATABASE_URL,
      ELECTRON_RUN_AS_NODE: "1",
    },
    cwd: isDev
      ? path.join(__dirname, "..", ".next", "standalone")
      : path.join(process.resourcesPath, "app", ".next", "standalone"),
  });

  nextServer.stdout.on("data", (data) => {
    console.log("[Next]", data.toString());
  });

  nextServer.stderr.on("data", (data) => {
    console.error("[Next Error]", data.toString());
  });

  try {
    await waitForPort(appPort);
    createWindow(appPort);
  } catch (err) {
    console.error("Server failed to start:", err);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (nextServer) {
    nextServer.kill();
  }
});