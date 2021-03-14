window.addEventListener('load', () => {
  checkOnline();
  setInterval(() => checkOnline(), 2000);
});

// TODO: Add the sw-toggle event listener here

// TODO: Add the registerWorker function here

// TODO: Add the unregisterWorker function here

const fetchData = async () => {
  const url = dqs('#url-input').value;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

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
}

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
}

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

window.addEventListener('load', async () => {
  renderTodoList();
});