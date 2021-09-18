module.exports = {
  apps: [{
    name: 'cfs_worker',
    script: '/root/.asdf/shims/yarn yarn nx serve worker',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: "1",
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
      key: '/Users/tung/.ssh/id_rsa',
      user: 'root',
      host: ['45.76.159.248'],
      ref: 'origin/master',
      repo: 'https://github.com/tungnt620/cfs.git',
      path: '/data/cfs',
      'post-deploy': '/root/.asdf/installs/nodejs/14.17.6/.npm/bin/pm2 reload ./apps/worker/ecosystem.config.js --env production'
    }
  }
}
