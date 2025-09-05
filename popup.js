async function getVersions() {
  let queryParam = Date.now().toString();
  const prd = `https://www.jetblue.com/flying-with-us?q=${queryParam}`;
  const nprd = `https://dotcom-nprd.jetblue.com/api/version?q=${queryParam}`;
  printVersions((await fetchByApi(nprd)) ?? "Unknown", "nprd");
  printVersions((await fetchByMeta(prd)) ?? "Unknown", "prd");
}

const fetchByMeta = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const ver = doc.querySelector('meta[name="version"]').content;
  return ver;
};

const fetchByApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  const data = await response.text();
  return data;
};

function printVersions(ver, env) {
  console.log(`Version: ${ver} is in environment: ${env}`);
  document.getElementById(env).appendChild(document.createTextNode(ver));
}

window.addEventListener("load", () => {
  getVersions();
});
