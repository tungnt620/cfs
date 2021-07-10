module.exports = {
  apps: [
    {
      name: "confession_api",
      script: "main.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "",
      instances: 1,
      autorestart: true,
      watch: false,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        DB_URL: "_migrations/confession_v2.db",
      },
      env_production: {
        NODE_ENV: "production",
        DB_URL: "/home/deploy/confession_v2.db",
      },
    },
  ],

  deploy: {
    production: {
      key: "/Users/nguyentung/.ssh/id_rsa",
      user: "deploy",
      host: ["45.77.40.46"],
      ref: "origin/master",
      repo: "git@bitbucket.org:tungnt620/confession_v2.git",
      path: "/var/www/confession_v2",
      "post-deploy":
        "cd server && npm install && pm2 reload ecosystem.config.js --env production",
    },
  },
};
