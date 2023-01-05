const {
  app,
  BrowserWindow,
  globalShortcut,
  desktopCapturer,
  screen,
  shell,
} = require("electron");
const path = require("path");
const GIF = require("gif.js");
const fs = require('fs')
const screenshot = require('electron-screenshot-app')

const screenshotOverlay = new BrowserWindow({
  width: 0,
  height: 0,
  frame: false,
  transparent: true,
  alwaysOnTop: true,
  skipTaskbar: true,
  webPreferences: {
    offscreen: true,
  },
});


app.on("ready", () => {
  const mainWindow = new BrowserWindow();
  globalShortcut.register("CommandOrControl+Shift+S", () => {
    handleGifRecord()
  });
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

const handleGifRecord = async () => {

};
