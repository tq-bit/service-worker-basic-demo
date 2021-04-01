// TODO: Add the registerWorker function here
const registerWorker = async () => {
  try {
    const worker = navigator.serviceWorker;
    const options = { scope: './' };
    const swRegisteration = await worker.register('serviceworker.js', options);
    window.dispatchEvent(new Event('sw-toggle'));
    return swRegisteration;
  } catch (e) {
    console.error(e);
  }
};

// TODO: Add the unregisterWorker function here
const unregisterWorker = async () => {
  try {
    const worker = navigator.serviceWorker;
    const swRegisteration = await worker.getRegistration();
    if (swRegisteration) {
      swRegisteration.unregister();
      window.dispatchEvent(new Event('sw-toggle'));
    } else {
      console.info('No active workers found');
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Take the url from the index.html file and
 * make a fetch request. Only tested with
 * the URLs covered in the article
 */
const fetchData = async () => {
  const url = dqs('#url-input').value;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/**
 * Build up the list based on the data that
 * were received by the json-placeholder API
 */
const renderTodoList = async () => {
  const root = document.querySelector('#todo-table');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  const data = await fetchData();
  const list = dce('ul', ['list-group', 'list-group-item-action']);
  data.forEach((todo, index) => {
    if (index <= 10) {
      const el = dce('li', ['list-group-item']);
      el.innerText = todo.title;
      list.append(el);
    }
  });
  root.append(list);
};

/**
 * Util functions
 * 1. Shortcut for new DOM element creation
 * 2. Shortcut for document.querySelector
 * 3. Sets UI element to display if client is online
 * 4. Sets UI element to display if worker is registered
 */
const dce = (tag, classes) => {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  return el;
};

const dqs = (selector) => {
  return document.querySelector(selector);
};

const checkOnline = () => {
  const isOnline = navigator.onLine;
  const indicator = dqs('#online-indicator');
  indicator.classList.remove('bg-danger', 'bg-success');
  if (isOnline) {
    indicator.innerText = 'You are currently online';
    indicator.classList.add('bg-success');
  } else {
    indicator.innerText = 'You are currently offline';
    indicator.classList.add('bg-danger');
  }
};

// TODO: Add checkWorkerActive function here
const checkWorkerActive = async () => {
  const swRegisteration = await navigator.serviceWorker.getRegistration();
  const indicator = dqs('#worker-indicator');
  indicator.classList.remove('bg-danger', 'bg-success');
  if (swRegisteration && swRegisteration !== undefined) {
    indicator.innerText = 'You have an active service worker';
    indicator.classList.add('bg-success');
  } else {
    indicator.innerText = 'Service worker is not active';
    indicator.classList.add('bg-danger');
  }
};

// When the DOM is done loading, call these functions:
window.addEventListener('load', () => {
  checkOnline();
  setInterval(() => checkOnline(), 2000);
});

// TODO: Add the sw-toggle - event listener here
window.addEventListener('sw-toggle', () => {
  checkWorkerActive();
});