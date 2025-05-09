async function getVersions() {
	const prd = "https://dotcom.jetblue.com";
	const nprd = "https://dotcom-nprd.jetblue.com";

	const envs = [prd, nprd];
	for (const env of envs) {
		console.log(env);
		try {
			const response = await fetch(env);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");
			const ver = doc.querySelector('meta[name="version"]').content;
			console.log(ver);
			printVersions(ver, env);
			//return doc;
		} catch (error) {
			console.error("Failed to fetch:", error);
		}
	}
}

async function printVersions(ver, env) {
	console.log(env);
	let envAbbreviation = "prd";
	const versionVal = document.createTextNode(ver);
	if (env.includes("nprd")) {
		console.log(envAbbreviation);
		envAbbreviation = "nprd";
	}
	const el = document.getElementById(envAbbreviation);
	el.appendChild(versionVal);
}

window.addEventListener("load", () => {
	getVersions();
});
