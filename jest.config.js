const nextJest = require("next/jest")({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "node",
};

module.exports = nextJest(customJestConfig);