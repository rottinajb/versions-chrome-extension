async function getVersions() {
	let queryParam = window.crypto.randomUUID().substring(0,5);
	const prd = "https://www.jetblue.com/flying-with-us"+`?q=${queryParam}`;
	const nprd = "https://www-qa2.jetblue.com/flying-with-us"+`?q=${queryParam}`;
	const envs = [prd, nprd];

	for (const env of envs) {
		try {
			const response = await fetch(env);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");
			const ver = doc.querySelector('meta[name="version"]').content;
			printVersions(ver, env);
		} catch (error) {
			console.error("Failed to fetch:", error);
		}
	}
}

function printVersions(ver, env) {
	console.log(`Version: ${ver} is in environment: ${env}`);
	if (env.includes("www.jetblue")) {
		document.getElementById("prd").appendChild(document.createTextNode(ver));
	} else if (env.includes("www-qa2.jetblue")) {
		document.getElementById("nprd").appendChild(document.createTextNode(ver));
	}
	else {
		console.error(`Element not found.`);
		return;
	}
}

window.addEventListener("load", () => {
	getVersions();
});
