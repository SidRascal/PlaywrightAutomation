// @ts-check
// import { defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout: 10000,
  expect: {
    timeout: 5000

  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot : 'on',
    trace : 'retain-on-failure'


  },

});
module.exports = config

