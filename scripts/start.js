const concurrently = require('concurrently');
const path = require('path');

concurrently(
  [
    {
      command: 'npm run start',
      name: 'client',
      cwd: path.resolve(__dirname, '../client'),
      prefixColor: 'magenta',
    },
    {
      command: 'npm run dev',
      name: 'backend',
      cwd: path.resolve(__dirname, '../backend'),
      prefixColor: 'green',
    },
  ],
  {
    prefix: 'name',
    restartTries: 3,
  }
)
