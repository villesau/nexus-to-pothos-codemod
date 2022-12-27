"use strict";

const defineTest = require("jscodeshift/dist/testUtils").defineTest;

describe("nexus to pothos", () => {
  describe("mutations and queries", () => {
    defineTest(__dirname, "transform",
        null,
        "mutations_and_queries",
        { parser: "ts", extensions: "ts" });
  });

  describe("object types", () => {
    defineTest(__dirname, "transform",
        null,
        "objectType",
        { parser: "ts", extensions: "ts" });
  });

  describe("enum types", () => {
    defineTest(__dirname, "transform",
        null,
        "enums",
        { parser: "ts", extensions: "ts" });
  });
});
