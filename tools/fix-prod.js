/**
 * Trick to avoid a webpack issue
 *
 * https://github.com/webpack/webpack/issues/706
 */

const replace = require("replace-in-file");

// fix build/fatina.min.js
replace({
    files: "build/fatina.min.js",
    from: /:t.Fatina=e\(\)\}/g,
    to: ":t.Fatina=e().default}"
});
