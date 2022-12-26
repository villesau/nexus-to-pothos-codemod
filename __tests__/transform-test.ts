"use strict";

const defineTest = require("jscodeshift/dist/testUtils").defineTest;

describe("nexus to pothos", () => {
  describe("mutation and queries", () => {
    defineTest(__dirname, "transform",
        null,
        "mutation",
        { parser: "ts", extensions: "ts" });
  });

  describe("object types", () => {
    defineTest(__dirname, "transform",
        null,
        "objectType",
        { parser: "ts", extensions: "ts" });
  });
});
