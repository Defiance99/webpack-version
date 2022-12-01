module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '<rootDir>/src/components/**/*.spec.ts',
    '<rootDir>/src/modules/**/*.spec.ts',
    '<rootDir>/src/directives/**/*.spec.ts',
    '<rootDir>/src/UI/**/*.spec.ts',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
