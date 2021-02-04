module.exports = {
  testMatch: [
      '**/*.spec.(js|ts)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/index.js'
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>src/setupTests.js"
  ]
}
