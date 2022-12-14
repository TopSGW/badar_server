module.exports = {
  apps: [{
    script: 'dist/index.js',
    instances: 0,
    exec_mode: "cluster",
  }],
};
