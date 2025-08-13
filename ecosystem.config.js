module.exports = {
  apps: [
    {
      name: "helpdesk-dashboard",
      cwd: "/var/www/itsm-fe",
      script: "npm",
      args: "start -- -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOST: "0.0.0.0"
      },
      autorestart: true,
      max_restarts: 10,
      watch: false,
      kill_timeout: 5000,
      out_file: "/var/log/pm2/helpdesk-dashboard.out.log",
      error_file: "/var/log/pm2/helpdesk-dashboard.err.log"
    }
  ]
}