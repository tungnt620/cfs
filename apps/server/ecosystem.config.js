module.exports = {
  apps: [{
    name: 'cfs_api',
    script: 'main.js',
    cwd: __dirname,
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
      key: '/Users/tung/.ssh/id_rsa.pub',
      user: 'root',
      host: ['45.76.159.248'],
      ref: 'origin/master',
      repo: 'https://github.com/tungnt620/cfs.git',
      path: '/data/cfs',
      'post-deploy': '/root/.asdf/shims/yarn install && ' +
        '/root/.asdf/shims/yarn nx build server --prod && ' +
        'cp ./apps/server/ecosystem.config.js ./dist/apps/server && ' +
        'cd ./dist/apps/server && ' +
        '/root/.asdf/installs/nodejs/14.17.6/.npm/bin/pm2 reload ecosystem.config.js --env production'
    }
  }
}
