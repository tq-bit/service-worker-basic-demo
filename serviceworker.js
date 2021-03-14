/**
 * These variables control how the service worker behaves
 * depending on the application version. They are not
 * mandatory, but help to keep track over your service
 * worker's version and therefor its cache control
 */
const appFiles = ['./index.html', './main.css', './main.js'];
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

// TODO: Add cacheAppFiles function here

// TODO: Add cacheRequest function here

self.addEventListener('install', (event) => {
  /**
   * Listen for the install event
   *
   * This phase can be used to cache app-specific
   * html, css and javascript files for offline
   * operations.
   */
});

self.addEventListener('activate', (event) => {
  /**
   * Listen for the activate event
   *
   * This phase can be used to remove any caches
   * that might remain from old service workers.
   * Using a worker whitelist might come in handy
   * at this point.
   */
});

self.addEventListener('fetch', (event) => {
  /**
   * Listen for http - fetch requests
   *
   * Whenever the browser fetches data from a
   * remote location, this event is fired. Here,
   * you can modify the request, cache responses
   *
   */
});

self.addEventListener('periodicsync', (event) => [
  /**
   * periodicsync can be used to synchronize the app
   * with data from a remote server or API.
   * > Not convered in the initial article
   */
])

self.addEventListener('error', (e) => {
  console.error(e);
});
