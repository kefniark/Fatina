/**
 * Trick to avoid a webpack issue
 *
 * https://github.com/webpack/webpack/issues/706
 */

const replace = require("replace-in-file");

// fix build/fatina.min.js

(async () => {
	// For browser direct usage (dont need .default)
	await replace({
		files: "build/fatina.min.js",
		from: /.\.Fatina=.\(\)\}/g,
		to: (match) => {
			match = match.slice(0, -1);
			match += ".default}";
			return match;
		}
	});
})();
