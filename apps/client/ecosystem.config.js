module.exports = {
  apps: [{
    name: 'confession_fe',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: "max",
    autorestart: true,
    watch: false,
    ignore_watch : ["node_modules"],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],

  deploy: {
    production: {
      key: '/Users/nguyentung/.ssh/id_rsa',
      user: 'deploy',
      host: ['45.77.40.46'],
      ref: 'origin/master',
      repo: 'git@bitbucket.org:tungnt620/confession_v2.git',
      path: '/var/www/confession_v2',
      'post-deploy': 'cd client && npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
