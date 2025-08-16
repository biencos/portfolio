module.exports = {
  style: {
    css: {
      loaderOptions: {
        url: false,
      },
    },
  },
  devServer: {
    // Override specific security-vulnerable features only
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  },
  eslint: {
    enable: false, // Disable ESLint in webpack to avoid conflicts
  },
}
