import {
  initializeStorage,
  getAppData,
} from "./storage.js";
import {
    renderUsingJSON,
    renderUsingStorage
} from './renderer.js'

async function startApp() {
  try {
    await initializeStorage();

    const appData = getAppData();
    if(appData !== null ){
        renderUsingStorage()
        // renderUsingJSON()
    }
    else{
        // renderUsingJSON()
    }
    console.log("Application started with:", appData);
  } catch (error) {
    console.error("Failed to start application:", error);
  }
}

startApp();