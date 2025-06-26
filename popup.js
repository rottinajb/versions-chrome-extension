async function getVersions() {
        chrome.storage.local.get('envList').then((res) => {
                const envs = res.envList || [
                        'https://www.jetblue.com/flying-with-us',
                        'https://dotcom-nprd.jetblue.com'
                ];

                chrome.runtime.sendMessage({ type: 'getVersions', envs }, (data) => {
                        for (const env of envs) {
                                const ver = data ? data[env] : null;
                                if (ver) {
                                        printVersions(ver, env);
                                }
                        }
                });
        });
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
        const taglineEl = document.getElementById("tagline");
        if (taglineEl) {
                taglineEl.textContent = chrome.i18n.getMessage("tagline");
        }
        getVersions();
});
