
process.env.VUE_APP_ENABLE_BETA = 'true'
module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!sbc-common-components/.*)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      babelConfig: true
    }
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/App.vue',
    '!src/service-worker.js'

  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html']
}
