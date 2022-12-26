#!/usr/bin/env node
require('ts-node').register();
const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
const path = require("path");
const execa = require("execa");
process.argv.shift();
process.argv.shift();
const args = [
  "-t",
  path.resolve(__dirname, "../transform.ts"),
    "--parser", "ts",
    "--extensions", "ts",
  ...process.argv
];
const result = execa.sync(jscodeshiftExecutable, args, {
  stdio: "inherit",
  stripEof: false
});
if (result.error) {
  throw result.error;
}
