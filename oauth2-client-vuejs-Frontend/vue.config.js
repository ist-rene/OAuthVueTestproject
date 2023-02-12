const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  "outputDir": "target/dist",
  "assetsDir": "target/dist",
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "port": 8081,
    "proxy": {
      "/api": {
        "target": "http://localhost:8080",
        "changeOrigin": true
      },
      "/oauth2": {
        "target": "http://auth-server:9000",
        "changeOrigin": true
      },
      "/rest/resource": {
        "target": "http://localhost:8090",
        "changeOrigin": true
      },
    }
  }
})
