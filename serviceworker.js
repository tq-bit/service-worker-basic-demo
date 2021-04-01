/**
 * These variables control how the service worker behaves
 * depending on the application version. They are not
 * mandatory, but help to keep track over your service
 * worker's version and therefor its cache control
 */
const appFiles = ['./index.html', './main.js'];
const appWhitelist = ['app_v1', 'app_v2', 'app_v3'];
const appActive = 'app_v1';
const loggerActive = true;

/**
 * devLog is a utility function that only logs
 * messages if we set loggerActive's value to true
 */
const devLog = (msg, type) => {
  if (loggerActive) {
    switch (type) {
      case 'w':
        return console.warn(msg);

      case 'e':
        return console.error(msg);

      default:
        return console.log(msg);
    }
  }
};

// TODO: Add deleteOldCache function here
const deleteOldCache = async (appWhitelist) => {
  const keys = await caches.keys();
  keys.forEach((version) => {
    if (!appWhitelist.includes(version)) {
      devLog(`Deleting ${version} from active service worker`, 'w');
      caches.delete(version);
    }
  });
};

// TODO: Add cacheAppFiles function here
const cacheAppFiles = async (appActive, appFiles) => {
  const cacheActive = await caches.open(appActive);
  cacheActive.addAll(appFiles);
};

// TODO: Add cacheRequest function here
const cacheRequest = async (appActive, request) => {
  const online = navigator.onLine;
  const cachedResponse = await caches.match(request);
  // If response has been cached before, get it
  if (cachedResponse) {
    devLog(`Found a cached response for ${request.url}`);
    return cachedResponse;

    // If response is not in cache, get it from network and store in cache
  } else if (online) {
    devLog('No cached response found, attempting to fetch it');
    const response = await fetch(request);

    // Do the necessary operation to cache the response
    const resClone = response.clone();
    const cache = await caches.open(appActive);
    cache.put(request, resClone);

    console.group();
    devLog('Successfully cloned response and saved to cache');
    devLog(resClone);
    console.groupEnd();
    // Return the response to the client
    return response;
  } else {
    console.error('No cached data and no network connection recognized');
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil([cacheAppFiles(appActive, appFiles)]);
});

self.addEventListener('activate', (event) => {
  event.waitUntil([deleteOldCache(appWhitelist)]);
});

self.addEventListener('fetch', (event) => {
  devLog('Intercepted fetch request', 'w');
  event.respondWith(cacheRequest(appActive, event.request));
});

self.addEventListener('periodicsync', (event) => [
  /**
   * periodicsync can be used to synchronize the app
   * with data from a remote server or API.
   * > Not convered in the initial article
   */
]);

self.addEventListener('error', (e) => {
  console.error(e);
});
