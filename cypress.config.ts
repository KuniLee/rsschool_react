import { defineConfig } from 'cypress'
import codeCoverage from '@cypress/code-coverage/task'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverage(on, config)

      return config
    },
    video: false,
    baseUrl: 'http://localhost:5173',
  },
})
