const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let nextServer;

const PORT = 3000;

function createWindow() {

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#ffffff",
  });

  win.loadURL(`http://localhost:${PORT}`);
}

app.whenReady().then(() => {

  // const serverPath = path.join(
  //   __dirname,
  //   "..",
  //   ".next",
  //   "standalone",
  //   "server.js"
  // );
  const isDev = !app.isPackaged;
  const serverPath = isDev
  ? path.join(__dirname, "..", ".next", "standalone", "server.js")
  : path.join(process.resourcesPath, ".next", "standalone", "server.js");

  nextServer = spawn("node", [serverPath], {
    env: {
      ...process.env,
      PORT,
    },
  });

  nextServer.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  nextServer.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  setTimeout(() => {
    createWindow();
  }, 5000);
});

app.on("before-quit", () => {

  if (nextServer) {
    nextServer.kill();
  }
});