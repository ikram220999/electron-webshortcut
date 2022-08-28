const { app, BrowserWindow, BrowserView, ipcMain, Menu } = require("electron");

let site = "google";

let url = "https://www." + site + ".com";

const createWindow = () => {

    const win = new BrowserWindow({
      backgroundColor: "white",
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      useContentSize: true
    });
    
    win.setMenu(null)
    const view = new BrowserView();
    win.setBrowserView(view);
  
    win.loadFile("index.html");
    view.setBounds({ x: 0, y: 80, width: 800, height: 550 });
    view.setAutoResize({ width: true, height: true });
    view.webContents.loadURL(url);
    console.log("url", url);
    // win.once("ready-to-show", () => {
    win.show();
};

const createView = (url) => {

  const win = BrowserWindow.getFocusedWindow();
  const cb = win.getContentBounds();

  const view = new BrowserView();
  win.setBrowserView(view);

  win.loadFile("index.html");
  view.setBounds({ x: 0, y: 80, width: cb.width, height: cb.height });
  view.setAutoResize({ width: true, height: true });
  view.webContents.loadURL(url);
  console.log("url", url);

  // win.once("ready-to-show", () => {
  win.show();
}

ipcMain.on("msg", (event, data) => {
  console.log("kambing", url);

  site = data;
  let asd = "https://www." + site + ".com"
  // var newWin =  BrowserView.getFocusedWindow();
  createView(asd);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
