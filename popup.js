async function getVersions() {
	const prd = "dotcom";
	const nprd = "dotcom-nprd";
	const envs = [prd, nprd];

	for (const env of envs) {
		console.log(env);
		try {
			const response = await fetch(`https://${env}.jetblue.com/api/version`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const ver = await response.text();
			// return data;
			console.log(ver);
			printVersions(ver, env);
		} catch (error) {
			console.error("Failed to fetch:", error);
			return null;
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
