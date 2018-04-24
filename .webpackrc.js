var path = require('path');

export default {
  "proxy": {
    "/plan": {
      "target": "http://192.168.10.23:8080",
      "changeOrigin": true,
      "secure": false
    },
    "/auth": {
      "target": "http://192.168.10.23:8080",
      "changeOrigin": true,
      "secure": false
    },
    "/material": {
      "target": "http://192.168.10.23:8080",
      "changeOrigin": true,
      "secure": false
    }
  },
  "disableCSSModules": true,
  "alias": {
    "@": path.resolve(__dirname, './src')
  }    
}