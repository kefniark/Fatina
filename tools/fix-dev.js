/**
 * Trick to avoid a webpack issue
 *
 * https://github.com/webpack/webpack/issues/706
 */

const replace = require("replace-in-file");

// fix build/fatina.js

(async () => {
	// For browser direct usage (dont need .default)
	await replace({
		files: "build/fatina.js",
		from: /root\["Fatina"\] = factory\(\);/g,
		to: "root[\"Fatina\"] = factory().default;"
	});
})();
