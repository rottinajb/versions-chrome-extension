const DEFAULT_ENVS = [
  'https://www.jetblue.com/flying-with-us',
  'https://dotcom-nprd.jetblue.com'
];

function loadOptions() {
  document.getElementById('title').textContent = chrome.i18n.getMessage('optionsTitle');
  chrome.storage.local.get('envList').then((res) => {
    const list = res.envList || DEFAULT_ENVS;
    document.getElementById('envs').value = list.join('\n');
  });
}

function saveOptions() {
  const raw = document.getElementById('envs').value;
  const list = raw.split(/\n+/).map(e => e.trim()).filter(Boolean);
  chrome.storage.local.set({ envList: list });
}

document.getElementById('save').addEventListener('click', saveOptions);

document.addEventListener('DOMContentLoaded', loadOptions);
