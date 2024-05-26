module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      exec_mode: 'cluster',
      instances: 'max', // Or a specific number of instances
      script: './.output/server/index.mjs', // Path to your Nuxt server entry point
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-18-159-207-233.eu-central-1.compute.amazonaws.com',
      ref: 'origin/main',
      repo: 'https://github.com/ethannschwartz/cloudpeak.git',
      path: '/home/ec2-user/cloudpeak/cloudnexus',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': ''
    }
  }
};
