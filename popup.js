async function getVersions() {
  let queryParam = Date.now().toString();
  const prd = `https://www.jetblue.com/flying-with-us?q=${queryParam}`;
  const nprd = `https://dotcom-nprd.jetblue.com/api/version?q=${queryParam}`;
  const legacyProd = `https://www.jetblue.com/build?q=${queryParam}`;
  const legacyStg2 = `https://www-stg2.jetblue.com/build?q=${queryParam}`;
  const legacyInt2 = `https://www-int2.jetblue.com/build?q=${queryParam}`;
  const legacyQa3 = `https://www-qa3.jetblue.com/build?q=${queryParam}`;
  printVersions((await fetchByApi(nprd)) ?? "Unknown", "nprd");
  printVersions((await fetchByMeta(prd)) ?? "Unknown", "prd");
  printVersions((await fetchByJson(legacyProd)) ?? "Unknown", "legacyProd");
  printVersions((await fetchByJson(legacyStg2)) ?? "Unknown", "legacyStg2");
  printVersions((await fetchByJson(legacyInt2)) ?? "Unknown", "legacyInt2");
  printVersions((await fetchByJson(legacyQa3)) ?? "Unknown", "legacyQa3");
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

const fetchByJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  return data.buildId;
};

function printVersions(ver, env) {
  console.log(`Version: ${ver} is in environment: ${env}`);
  document.getElementById(env).appendChild(document.createTextNode(ver));
}

window.addEventListener("load", () => {
  getVersions();
});
