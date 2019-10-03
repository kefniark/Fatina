/**
 * Trick to avoid a webpack issue
 *
 * https://github.com/webpack/webpack/issues/706
 */

const replace = require("replace-in-file");

// fix build/fatina.min.js
replace({
    files: "build/fatina.min.js",
    from: /.\.Fatina=.\(\)\}/g,
    to: (match) => {
		var src = match;
		match = match.slice(0, -1);
		match += ".default}";
		console.log('Fix Import: ', src, '=>', match);
		return match;
	}
});
