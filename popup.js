async function getVersions() {
	const prd = "https://www.jetblue.com/flying-with-us";
	const nprd = "https://www-qa2.jetblue.com/flying-with-us";
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
		} catch (error) {
			console.error("Failed to fetch:", error);
		}
	}
}

function printVersions(ver, env) {
	const envAbbreviation = env.includes("nprd") ? "nprd" : "prd";
	const el = document.getElementById(envAbbreviation);
	if (el) {
		el.appendChild(document.createTextNode(ver));
	} else {
		console.error(`Element with id "${envAbbreviation}" not found.`);
	}
}

window.addEventListener("load", () => {
	getVersions();
});
