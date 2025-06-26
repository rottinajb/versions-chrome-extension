const CACHE_KEY = 'versionCache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function fetchVersions(envs) {
  const results = {};
  for (const env of envs) {
    try {
      const response = await fetch(env);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const ver = doc.querySelector('meta[name="version"]').content;
      results[env] = ver;
    } catch (e) {
      console.error('Failed to fetch:', e);
      results[env] = null;
    }
  }
  await chrome.storage.local.set({
    [CACHE_KEY]: { timestamp: Date.now(), data: results }
  });
  return results;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'getVersions') {
    chrome.storage.local.get(CACHE_KEY).then(async (res) => {
      const cache = res[CACHE_KEY];
      const now = Date.now();
      const envs = msg.envs;
      if (cache && now - cache.timestamp < CACHE_TTL) {
        sendResponse(cache.data);
      } else {
        const data = await fetchVersions(envs);
        sendResponse(data);
      }
    });
    return true; // keep the message channel open for async response
  }
});
