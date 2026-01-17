/**
 * Re-export root Tailwind config so tooling run from the package
 * will pick up the same content globs and theme as the monorepo.
 */
module.exports = require('../../tailwind.config.cjs');
