const config = {
  use: {
    baseURL: 'http://localhost:3000/',
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests',
      use: {
        browserName: 'chromium',
      },
    },
    /* {
      name: 'firefox',
      testDir: './tests',
      use: {
        browserName: 'firefox',
      }
    },
        {
      name: 'webkit',
      testDir: './tests',
      use: {
        browserName: 'webkit',
      }
    }, */
  ],
}

module.exports = config
