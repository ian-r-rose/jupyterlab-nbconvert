module.exports = {
  "mode": "development",
  "entry": "./src/browser.ts",
  "output": {
    "path": __dirname+'/static',
    "filename": "main.bundle.js"
  },
  "module": {
    "rules": [
      {
        "test": /\.tsx?$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "ts-loader",
          "options": {
            "transpileOnly": true
          }
        }
      },
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
}
