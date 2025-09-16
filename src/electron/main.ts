import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev } from './util.js'

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        show: false
    })
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
    }
    mainWindow.maximize();
    // mainWindow.setFullScreen(true);
    mainWindow.show();
})
