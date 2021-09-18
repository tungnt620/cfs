module.exports = {
  apps: [{
    name: 'cfs_fe',
    script: '/root/.asdf/shims/yarn nx serve client --prod',

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
      key: '/Users/tung/.ssh/id_rsa',
      user: 'root',
      host: ['45.76.159.248'],
      ref: 'origin/master',
      repo: 'https://github.com/tungnt620/cfs.git',
      path: '/data/cfs',
      'post-deploy': '/root/.asdf/installs/nodejs/14.17.6/.npm/bin/pm2 reload ./apps/client/ecosystem.config.js --env production'
    }
  }
}
