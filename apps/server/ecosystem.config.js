module.exports = {
  apps: [{
    name: 'cfs_api',
    script: 'main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: "max",
    autorestart: true,
    watch: false,
    ignore_watch : ["node_modules"],
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
    }
  }],

  deploy: {
    production: {
      // key: '/Users/nguyentung/.ssh/id_rsa',
      user: 'root',
      host: ['45.76.159.248'],
      ref: 'origin/master',
      repo: 'https://github.com/tungnt620/cfs.git',
      path: '/data/cfs',
      'post-deploy': 'yarn install && yarn nx build server --prod && cp ./apps/server/ecosystem.config.js ./dist/apps/server && pm2 reload ecosystem.config.js --env production'
    }
  }
}
