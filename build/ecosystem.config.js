module.exports = {
  apps: [
    {
      name: 'cloud-testing-agent',
      author: 'DominiqueBertrand',
      sitename: 'Cloud Testing Agent',
      namespace: 'coopengo-cloud',
      script: './dist/main.js',
      max_restarts: 20,
      instances: 2,
      max_memory_restart: '300M',
      out_file: './out.log',
      error_file: './error.log',
      merge_logs: true,
      log_date_format: 'DD-MM HH:mm:ss Z',
      log_type: 'json',
      PORT: process.env.SERVER_PORT ?? 3000,
      env_production: {
        NODE_ENV: 'production',
        exec_mode: 'cluster_mode',
      },
      env_development: {
        NODE_ENV: 'development',
        watch: true,
        watch_delay: 3000,
        ignore_watch: ['./node_modules', './public', './.DS_Store', './package.json', './yarn.lock', './src'],
      },
    },
  ],
};
